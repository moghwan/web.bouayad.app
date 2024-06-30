<template>
  <div class="p-5 bg-gray-100 flex flex-col">
      <div class="flex flex-row justify-center p-5 pt-0">
          الإعدادات
      </div>
      <div class="flex flex-col bg-white h-full rounded-lg p-12">
        <div class="flex flex-row align-middle justify-between">
          <span>إختر المدن المفظلة لديك (في حدود 8 مدن)</span>
          <CitiesDropdown :cities="cities"/>
        </div>
      </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import CitiesDropdown from "@/components/partials/CitiesDropdown.vue";
const cities = ref(null);

onMounted(() => fetchData())

async function fetchData() {
    const HOST   = process.env.RA_HOST || import.meta.env.VITE_BOUAYADAPP_API_URL;
    const SECRET = process.env.RA_SECRET || import.meta.env.VITE_BOUAYADAPP_API_SECRET;

    const options = {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": HOST,
            "x-rapidapi-key": SECRET
        }
    };
    const response = await fetch(`https://${HOST}/cities`, options);
    cities.value = await response.json();
    cities.value = cities.value.data;
}
</script>
