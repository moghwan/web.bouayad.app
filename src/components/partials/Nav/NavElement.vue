<template>
  <li>
    <button
        type="button"
        @click="selectItem(id)"
        :aria-selected="selected === id"
        class="py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline"
    >
      <IconDimensions v-if="name === 'displaymode'" :color="selected === id ? 'gray' : 'black'" />
      <IconClock2 v-if="name === 'salatetimes'" :color="selected === id ? 'gray' : 'black'" />
      <IconMoonFilled v-if="name === 'ramadanmode'" :color="selected === id ? 'gray' : 'black'" />
      <IconSettings v-if="name === 'settings'" :color="selected === id ? 'gray' : 'black'" />

      <span
        :class="selected === id ? '' : 'gray'"
        class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
      >
        {{ label }}
      </span>
    </button>
  </li>
</template>

<script setup>
import { IconDimensions, IconMoonFilled, IconClock2, IconSettings } from '@tabler/icons-vue';

const emit = defineEmits(['parent-selectnavitem'])

const props = defineProps({
  selected: { required: true },
  label: {required: true },
  id: {required: true },
  route: {required: true },
  name: {required: true },
});

const selectItem = (i) => emit('parent-selectnavitem', i);
</script>
