<template>
  <div class="flex justify-center">
    <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
      <div class="py-3 px-6 border-b border-gray-300">
        اليومية العصرية
      </div>
      <div class="p-6" v-if="data">
        <h5 class="text-gray-900 text-xl font-medium mb-2">مقولة  اليوم</h5>
        <p class="text-gray-700 text-base mb-4" v-for="hikma in data.events.hikams_back" :key="hikma.key">
          {{ hikma }}
        </p>
        
      </div>
      <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
        <ul v-if="data">
          <li v-for="hikma in data.events.hikams_front" :key="hikma.key">{{ hikma }}</li>
        </ul>
        <spinner class="flex justify-center" v-if="!data" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
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
