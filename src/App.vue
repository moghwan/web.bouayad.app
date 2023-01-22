<script setup>
import { RouterLink, RouterView } from "vue-router";
import TheDay from "@/components/TheDay.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <TheDay />
</template>
