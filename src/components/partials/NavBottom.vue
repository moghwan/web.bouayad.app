<template>
  <nav class="absolute inset-x-0 bottom-0">
    <ul class="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
      <li class="w-full">
        <RouterLink to="/" class="inline-block w-full p-4 hover:text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white">Home</RouterLink>
      </li>
      <li class="w-full">
        <RouterLink to="/about" class="inline-block w-full p-4 hover:text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white">About</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
