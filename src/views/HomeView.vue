<template>
  <TheDay v-if="data" :data="data" @parent-refreshtheday="refreshTheDay" :selectedCityId="selectedCityId" />
  <spinner class="flex justify-center h-screen items-center"  v-if="!data" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import TheDay from "@/components/TheDay.vue";
import Spinner from "@/components/partials/SpinnerLoader.vue";

const data = ref(null);
const selectedCityId = ref(1);

onMounted(() => {
  fetchData(selectedCityId.value)
})

async function fetchData(cityId) {
  const response = await fetch(`${import.meta.env.VITE_BOUAYADAPP_API_URL}/hikams/${cityId}`);
  data.value = await response.json()
  selectedCityId.value = cityId;
}

function refreshTheDay(cityId) {
  cityId ? fetchData(cityId) : fetchData(selectedCityId.value)
}

</script>