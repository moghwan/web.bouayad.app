<template>
  <td :class="salate.class">
    {{ salate.time }} 
  </td>
  <td class="border-r" :class="salate.class">
    {{ salate.name_ar }}
  </td>
</template>

<script setup>
defineProps({
  salate: {
    type: Object,
    required: true,
  }
});
</script>
