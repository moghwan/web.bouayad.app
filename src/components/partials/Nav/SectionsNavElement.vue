<template>
    <button
      type="button"
      :aria-selected="parseInt(selected) === id"
      :class="parseInt(selected) === id ? 'bg-white shadow' : null"
      class="flex items-center rounded-md py-4 px-4 text-sm font-semibold lg:pr-3"
    >
        <span class="sr-only xl:not-sr-only lg:ml-2 text-slate-900">{{ label }}</span>
        <IconMoonFilled v-if="name === 'ramadanmode'" :color="parseInt(selected) === id ? 'black' : 'gray'" />
        <IconClock2 v-if="name === 'salatetimes'" :color="parseInt(selected) === id ? 'black' : 'gray'" />
        <IconSettings v-if="name === 'settings'" :color="parseInt(selected) === id ? 'black' : 'gray'" />

    </button>
</template>

<script setup>
import {IconClock2, IconMoonFilled, IconSettings} from "@tabler/icons-vue";

const props = defineProps({
    selected: { required: true },
    label: {required: true },
    id: {required: true },
    route: {required: true },
    name: {required: true },
});

</script>