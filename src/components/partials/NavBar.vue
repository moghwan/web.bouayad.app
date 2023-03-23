<template>
  <div class="flex justify-center antialiased bg-gray-200 p-8 absolute items-center h-screen z-10">
    <nav id="nav" class="w-56 relative">
      <span
        class="absolute h-10 w-full bg-white rounded-lg shadow ease-out transition-transform transition-medium"
        :style="{ transform: `translateY(calc(100% * ${selected}))` }"
      ></span>
      <ul class="relative">
        <nav-element
            @parent-selectnavitem="selectNavItem"
            :selected="selected"
            id="0"
            label="Display mode"
        />
        <nav-element
            @parent-selectnavitem="selectNavItem"
            :selected="selected"
            id="1"
            label="Ramadan Mode"
        />
        <nav-element
            @parent-selectnavitem="selectNavItem"
            :selected="selected"
            id="2"
            label="Toggle Salate Times"
        />
        <nav-element
            @parent-selectnavitem="selectNavItem"
            :selected="selected"
            id="3"
            label="Toggle Dark Mode"
        />
        <nav-element
            @parent-selectnavitem="selectNavItem"
            :selected="selected"
            id="4"
            label="Progress"
        />
        <nav-element
            @parent-selectnavitem="selectNavItem"
            :selected="selected"
            id="5"
            label="Settings"
        />
      </ul>
    </nav>
  </div>
</template>

<script setup>
// import { RouterLink } from "vue-router";
import {ref} from "vue";
import NavElement from "./Nav/NavElement.vue";

const selected = ref(0)
const selectNavItem = (i) => selected.value = i;

</script>
