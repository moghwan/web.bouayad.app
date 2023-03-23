<template>
  <li>
    <button
        type="button"
        @click="selectItem(id)"
        :aria-selected="selected === id"
        class="py-2 px-3 w-full flex items-center focus:outline-none focus-visible:underline"
    >
      <svg
          :class="selected === id ? 'text-indigo-400' : 'text-gray-500'"
          class="h-6 w-6 transition-all ease-out transition-medium"
          viewBox="0 0 24 24"
          fill="currentColor"
      >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 101.414 1.414L4 12.414V21a1 1 0 001 1h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a1 1 0 001-1v-8.586l.293.293a1 1 0 001.414-1.414l-9-9zM18 10.414l-6-6-6 6V20h3v-6a1 1 0 011-1h4a1 1 0 011 1v6h3v-9.586z"
        />
      </svg>
      <span
          :class="selected === id ? 'text-indigo-600' : 'text-gray-700'"
          class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
      >
              {{ label }}
            </span>
    </button>
  </li>
</template>

<script setup>
import {toRefs, ref, toRef, watch} from "vue";

const emit = defineEmits(['parent-selectnavitem'])

const props = defineProps({
  selected: { required: true },
  label: {required: true },
  id: {required: true },
});

const id = toRef(props,'id'); // react to prop

const selectItem = (i) => emit('parent-selectnavitem', i);

</script>
