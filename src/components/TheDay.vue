<template>
  <p v-if="!data">loading</p>
  <ul v-if="data">
    <li v-for="hikma in data.events.hikams_front" :key="hikma.key">{{ hikma }}</li>
  </ul>
</template>

<script setup>
import {onMounted, ref} from "vue";

const data = ref(null);

onMounted(() => {
  fetchData()
})

async function fetchData() {
  const response = await fetch(import.meta.env.VITE_BOUAYADAPP_API_URL + "/hikams");
  data.value = await response.json()
}
</script>
