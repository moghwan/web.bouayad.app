<template>
  <TheDay v-if="data" :data="data" />
  <spinner class="flex justify-center h-screen items-center"  v-if="!data" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import TheDay from "@/components/TheDay.vue";
import Spinner from "@/components/partials/SpinnerLoader.vue";

const data = ref(null);

onMounted(() => {
  fetchData()
})

async function fetchData() {
  const response = await fetch(import.meta.env.VITE_BOUAYADAPP_API_URL + "/hikams");
  data.value = await response.json()
}

</script>