<template>
  <NavBottom />
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import NavBottom from "@/components/partials/NavBottom.vue";
</script>