<template>
  <div class="p-5 bg-gray-100 flex flex-col">
    <div class="flex flex-row justify-center p-5 pt-0">
      الإعدادات
    </div>
    <div class="flex flex-col bg-white h-full rounded-lg p-12 gap-8">
      <!-- Cities Selection -->
      <div class="flex flex-row align-middle justify-between">
        <CitiesDropdown :cities="cities"/>
        <span>إختر المدن المفضلة لديك (في حدود 8 مدن)</span>
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
import { onMounted, ref } from "vue";
import { useSettingsStore } from "~/stores/settings";
import ThemeDropdown from "~/components/partials/ThemeDropdown.vue";

const settingsStore = useSettingsStore();

const cities = ref(null);
const error = ref(null);
const isFetching = ref(null);

onMounted(() => fetchData())

async function fetchData() {
  const {data, error} = await useFetch(`/api/cities`);

  if (!error.value) {
    cities.value = data.value?.data || null;
  } else {
    console.error('Error fetching cities:', error.value);
  }
}
</script>
