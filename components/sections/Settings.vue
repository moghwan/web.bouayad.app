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
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <input 
              type="radio" 
              id="theme-system" 
              name="theme" 
              value="system" 
              :checked="currentTheme === 'system'"
              @change="updateTheme('system')"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <label for="theme-system" class="ml-2">تلقائي (حسب إعدادات النظام)</label>
          </div>

          <div class="flex items-center gap-2">
            <input 
              type="radio" 
              id="theme-light" 
              name="theme" 
              value="light" 
              :checked="currentTheme === 'light'"
              @change="updateTheme('light')"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <label for="theme-light" class="ml-2">وضع النهار</label>
          </div>

          <div class="flex items-center gap-2">
            <input 
              type="radio" 
              id="theme-dark" 
              name="theme" 
              value="dark" 
              :checked="currentTheme === 'dark'"
              @change="updateTheme('dark')"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <label for="theme-dark" class="ml-2">وضع الليل</label>
          </div>

          <div class="flex items-center gap-2">
            <input 
              type="radio" 
              id="theme-amoled" 
              name="theme" 
              value="amoled" 
              :checked="currentTheme === 'amoled'"
              @change="updateTheme('amoled')"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <label for="theme-amoled" class="ml-2">وضع الليل (AMOLED)</label>
          </div>
        </div>
        <span>إختر وضع العرض المفضل لديك</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useSettingsStore } from "~/stores/settings";

const settingsStore = useSettingsStore();
const currentTheme = computed(() => settingsStore.theme);

const updateTheme = (theme) => {
  settingsStore.updateTheme(theme);
};

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
