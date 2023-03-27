<template>
  <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
    <div class="flex space-x-1 rounded-lg bg-gray-100 p-0.5" role="tablist" aria-orientation="horizontal">
      <button class="flex items-center rounded-md py-4 px-4 text-sm font-semibold lg:pr-3" type="button">
        <IconMoonFilled color="gray" />
        <span class="sr-only lg:not-sr-only lg:ml-2 text-slate-900">رمضان</span>
      </button>
      <button class="flex items-center rounded-md py-4 px-4 text-sm font-semibold lg:pr-3 bg-white shadow" type="button">
        <IconClock2 color="gray" />
        <span class="sr-only lg:not-sr-only lg:ml-2 text-slate-900">مواقيت الصلوات</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { IconMoonFilled, IconClock2 } from '@tabler/icons-vue';
</script>

<style scoped>

</style>