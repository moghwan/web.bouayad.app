<template>
  <nav class="isolate inline-flex -space-x-px rounded-xl" aria-label="Pagination">
    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1.5" role="tablist" aria-orientation="horizontal">
      <SectionsNavElement
              v-for="menuItem in menuItems"
              @parent-selectnavitem="selectNavItem"
              :selected="selected"
              :id="menuItem.id"
              :label="menuItem.label"
              :route="menuItem.route"
              :name="menuItem.name"
              :key="menuItem.id"
          />
    </div>
  </nav>
</template>

<script setup>
import SectionsNavElement from "@/components/partials/Nav/SectionsNavElement.vue";
import {ref} from "vue";
import {useSettingsStore} from "@/stores/settings";

const settingsStore = useSettingsStore();
const selected = ref(settingsStore.selectedSection)
const menuItems = [
    {id: 1, label: "مواقيت الصلوات", route: "#", name: "salatetimes"},
    // {id: 2, label: "رمضان", route: "#", name: "ramadanmode"},
    // {id: 3, label: "الإعدادات", route: "#", name: "settings"},
]
const selectNavItem = (i) => selected.value = i;

</script>
