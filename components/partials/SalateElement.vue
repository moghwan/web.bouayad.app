<template>
  <td :class="salate.class" v-bind:data-result="salate.result">
    <span :class="salate.result === 'next' ? 'animate-pulse' : null">
      {{ salate.time }} 
    </span>
  </td>
  <td class="border-r" :class="salate.class" v-bind:data-result="salate.result">
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
