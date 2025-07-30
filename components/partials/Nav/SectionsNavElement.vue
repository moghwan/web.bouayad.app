<template>
  <button
      type="button"
      :aria-selected="parseInt(selected) === id"
      :class="parseInt(selected) === id ? 'bg-white dark:bg-gray-700 shadow' : null"
      class="flex items-center rounded-md py-4 px-4 text-sm font-semibold lg:pr-3"
  >
    <span class="sr-only lg:not-sr-only lg:ml-2 text-slate-900 dark:text-white">{{ label }}</span>
    <IconMoonFilled v-if="name === 'ramadanmode'" class="dark:text-white" :color="parseInt(selected) === id ? 'currentColor' : '#6b7280'"/>
    <IconClock2 v-if="name === 'salatetimes'" class="dark:text-white" :color="parseInt(selected) === id ? 'currentColor' : '#6b7280'"/>
    <IconSettings v-if="name === 'settings'" class="dark:text-white" :color="parseInt(selected) === id ? 'currentColor' : '#6b7280'"/>

  </button>
</template>

<script setup>
import {IconClock2, IconMoonFilled, IconSettings} from "@tabler/icons-vue";

const props = defineProps({
  selected: {required: true},
  label: {required: true},
  id: {required: true},
  route: {required: true},
  name: {required: true},
});
</script>
