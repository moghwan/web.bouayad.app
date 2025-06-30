<template>
  <div class="p-5 bg-gray-100 flex flex-col">
    <div class="flex flex-row justify-center p-5 pt-0">
      الإعدادات
    </div>
    <div class="flex flex-col bg-white h-full rounded-lg p-12 gap-8">
      <!-- Cities Selection -->
      <div class="flex flex-row align-middle justify-between">
        <CitiesDropdown :cities="cities"/>
        <span>إختر المدن المفضلة لديك (في حدود {{ MAX_SELECTED_CITIES }} مدن)</span>
      </div>

      <!-- Theme Selection -->
      <div class="flex flex-row align-middle justify-between">
        <ThemeDropdown />
        <span>إختر وضع العرض المفضل لديك</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSettingsStore } from "~/stores/settings";
import { useApi } from "~/composables/useApi";
import ThemeDropdown from "~/components/partials/ThemeDropdown.vue";
import { MAX_SELECTED_CITIES } from '~/constants';

const settingsStore = useSettingsStore();

// Use the API composable to fetch cities
const { data: apiData, error, isLoading } = useApi(
  '/api/cities',
  {
    immediate: true,
    transform: (data) => data
  }
);

// Extract cities from the API response
const cities = computed(() => apiData.value?.data || null);
</script>
