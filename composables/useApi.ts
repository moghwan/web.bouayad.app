import { ref, Ref, unref, watchEffect, isRef } from 'vue';
import { useStorage } from '@vueuse/core';
import { ApiError } from '~/types/api';
import { API_CACHE_TIME } from '~/constants';

/**
 * A composable for making API requests with proper error handling and loading state
 * @param url The URL to fetch data from
 * @param options Additional options for the fetch request
 * @returns An object with data, error, isLoading, and refresh function
 */
export function useApi<T>(
  url: string | Ref<string>,
  options: {
    immediate?: boolean;
    watch?: boolean;
    transform?: (data: any) => T;
    cache?: boolean;
    cacheTime?: number; // Cache time in milliseconds
  } = {}
) {
  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref<ApiError | null>(null);
  const isLoading = ref(false);

  // Default options
  const {
    immediate = true,
    watch = false,
    transform = (data: any) => data as T,
    cache = true,
    cacheTime = API_CACHE_TIME
  } = options;

  /**
   * Fetch data from the API
   */
  async function fetchData() {
    isLoading.value = true;
    error.value = null;

    try {
      const resolvedUrl = typeof url === 'function' ? url() : unref(url);

      // Check cache if enabled
      if (cache && process.client) {
        const cacheKey = `api_cache_${resolvedUrl}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          try {
            const { data: cachedValue, timestamp } = JSON.parse(cachedData);
            const now = Date.now();

            // If the cache is still valid
            if (now - timestamp < cacheTime) {
              try {
                // Create a deep copy of the cached value to avoid cross-origin issues
                const deepCopy = JSON.parse(JSON.stringify(cachedValue));
                data.value = transform(deepCopy);
                isLoading.value = false;
                return;
              } catch (e) {
                console.warn('Error processing cached data:', e);
                // Continue with fetching fresh data
              }
            }
          } catch (e) {
            // If there's an error parsing the cache, ignore it and fetch fresh data
            console.warn('Error parsing cached data:', e);
          }
        }
      }

      // Fetch fresh data
      const response = await useFetch(resolvedUrl);

      if (response.error.value) {
        error.value = {
          error: true,
          message: 'Error fetching data',
          details: response.error.value.message,
          status: response.error.value.statusCode
        };
      } else {
        const responseData = response.data.value;
        try {
          // Create a deep copy of the response data to avoid cross-origin issues
          const deepCopy = JSON.parse(JSON.stringify(responseData));
          data.value = transform(deepCopy);
        } catch (e) {
          console.warn('Error processing response data:', e);
          // Fallback to using the original data
          data.value = transform(responseData);
        }

        // Cache the data if enabled
        if (cache && process.client && responseData) {
          const cacheKey = `api_cache_${resolvedUrl}`;
          const cacheValue = JSON.stringify({
            data: responseData,
            timestamp: Date.now()
          });

          try {
            localStorage.setItem(cacheKey, cacheValue);
          } catch (e) {
            console.warn('Error caching data:', e);
          }
        }
      }
    } catch (err) {
      error.value = {
        error: true,
        message: 'Error fetching data',
        details: err instanceof Error ? err.message : String(err),
      };
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Refresh the data
   * @param options Options for refreshing the data
   * @param options.force Force a refresh, bypassing the cache
   * @returns The data, error, and loading state
   */
  async function refresh(options: { force?: boolean } = {}) {
    const { force = false } = options;

    // If force is true, clear the cache for this URL
    if (force && cache && process.client) {
      const resolvedUrl = typeof url === 'function' ? url() : unref(url);
      const cacheKey = `api_cache_${resolvedUrl}`;
      localStorage.removeItem(cacheKey);
    }

    await fetchData();
    return { data, error, isLoading };
  }

  // Fetch data immediately if immediate is true
  if (immediate) {
    fetchData();
  }

  // Watch for changes in the URL if watch is true
  if (watch && isRef(url)) {
    watchEffect(() => {
      fetchData();
    });
  }

  return {
    data,
    error,
    isLoading,
    refresh,
  };
}
