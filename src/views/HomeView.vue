<template>
  <div v-auto-animate="{ duration: 500 }">
    <TheDay v-if="data" :data="data" @parent-refreshtheday="refreshTheDay" :selectedCityId="selectedCityId"/>
    <spinner class="flex justify-center h-screen items-center" v-if="!data"/>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import TheDay from "@/components/TheDay.vue";
import Spinner from "@/components/partials/SpinnerLoader.vue";
import {useCityStore} from "@/stores/city"

const store = useCityStore();
const data = ref(null);
const selectedCityId = ref(store.cityId);

onMounted(() => {
  fetchData(selectedCityId.value)
})

async function fetchData(cityId) {
  const HOST   = process.env.RA_HOST || import.meta.env.VITE_BOUAYADAPP_API_URL;
  const SECRET = process.env.RA_SECRET || import.meta.env.VITE_BOUAYADAPP_API_SECRET;

  const options = {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": HOST,
      "x-rapidapi-key": SECRET
    }
  };
  const response = await fetch(`https://${HOST}/hikams/${cityId}`, options);
  data.value = await response.json()
  selectedCityId.value = cityId;
}

function refreshTheDay(cityId) {
  cityId ? fetchData(cityId) : fetchData(selectedCityId.value)
}

</script>