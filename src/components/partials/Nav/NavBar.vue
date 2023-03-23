<template>
  <div class="flex justify-center bg-gradient-to-r from-gray-200 p-8 absolute items-center h-screen z-10">
    <nav id="nav" class="relative">
      <span
        class="absolute h-10 w-full bg-white rounded-lg shadow ease-out transition-transform transition-medium"
        :style="{ transform: `translateY(calc(100% * ${selected}))` }"
      ></span>
      <ul class="relative">
        <nav-element
            v-for="menuItem in menuItems"
            @parent-selectnavitem="selectNavItem"
            :selected="selected"
            :id="menuItem.id"
            :label="menuItem.label"
            :route="menuItem.route"
            :icon="menuItem.icon"
        />
      </ul>
    </nav>
  </div>
</template>

<script setup>
// import { RouterLink } from "vue-router";
import {ref} from "vue";
import NavElement from "./NavElement.vue";

const selected = ref(0)
const menuItems = [
  {id: 0, label: "Display mode", route: "#", icon: ""},
  {id: 1, label: "Ramadan Mode", route: "#", icon: ""},
  {id: 2, label: "Toggle Salate Times", route: "#", icon: ""},
  {id: 3, label: "Settings", route: "#", icon: ""},
]
const selectNavItem = (i) => selected.value = i;

</script>
