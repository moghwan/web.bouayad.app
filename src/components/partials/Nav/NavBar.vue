<template>
  <div class="lg:flex justify-center bg-gradient-to-r transition-opacity from-transparent to-white p-8 right-0 absolute items-center h-screen z-10 hidden">
    <nav id="nav" class="relative">
      <span
            class="absolute h-10 w-full bg-white rounded-lg shadow ease-out transition-transform transition-medium"
            :style="{ transform: `translateY(calc(100% * ${selected}))` }"
      ></span>
      <ul class="relative">
          <NavElement
                  v-for="menuItem in menuItems"
                  @parent-selectnavitem="selectNavItem"
                  :selected="selected"
                  :id="menuItem.id"
                  :label="menuItem.label"
                  :route="menuItem.route"
                  :name="menuItem.name"
                  :key="menuItem.id"
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
  {id: 0, label: "Display mode", route: "#", name: "displaymode"},
  {id: 1, label: "Ramadan Mode", route: "#", name: "ramadanmode"},
  {id: 2, label: "Salate Times", route: "#", name: "salatetimes"},
  {id: 3, label: "Settings", route: "#", name: "settings"},
]
const selectNavItem = (i) => selected.value = i;

</script>
