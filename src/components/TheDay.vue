<template>
  <div class="flex justify-center h-screen items-center">
    <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
      <!--app name-->
      <div class="py-3 px-6 border-b border-gray-300">
        اليومية العصرية
      </div>
      <!--back hikams-->
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">مقولة اليوم</h5>
        <p class="text-gray-700 text-base mb-4" v-for="hikma in data.events.hikams_back" :key="hikma.key">
          {{ hikma }}
        </p>
      </div>
      <!--front hikams-->
      <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
        <p v-for="hikma in data.events.hikams_front" :key="hikma.key">{{ hikma }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
