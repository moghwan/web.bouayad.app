import { ApiError } from '~/types/api';

/**
 * Fetch data from an external API with error handling
 * @param url The URL to fetch data from
 * @returns The fetched data or an error object
 */
export async function fetchExternalApi<T>(url: string): Promise<T> {
  try {
    return await $fetch<T>(url);
  } catch (error) {
    // Convert the error to a typed error object
    const apiError: ApiError = {
      error: true,
      message: 'Error fetching data from external API',
      details: error instanceof Error ? error.message : String(error),
      status: error instanceof Error && 'status' in error ? (error as any).status : 500
    };
    
    // Throw the error to be caught by the calling function
    throw apiError;
  }
}

/**
 * Format an API error response
 * @param error The error object
 * @returns A formatted error response
 */
export function formatApiError(error: unknown): ApiError {
  if (error && typeof error === 'object' && 'error' in error && error.error === true) {
    // If it's already an ApiError, return it
    return error as ApiError;
  }
  
  // Otherwise, create a new ApiError
  return {
    error: true,
    message: 'Error fetching data from external API',
    details: error instanceof Error ? error.message : String(error),
    status: error instanceof Error && 'status' in error ? (error as any).status : 500
  };
}