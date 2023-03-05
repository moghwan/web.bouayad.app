<template>
  <td class="font-light text-sm">
    {{ salate.time }}
  </td>
  <td class="font-light border-r">
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
