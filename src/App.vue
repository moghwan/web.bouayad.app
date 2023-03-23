<template>
  <NavBar />
  <RouterView class="flex justify-center h-screen items-center" />
</template>

<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/partials/NavBar.vue";

</script>