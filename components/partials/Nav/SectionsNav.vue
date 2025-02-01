<template>
  <nav class="isolate inline-flex -space-x-px rounded-xl" aria-label="Pagination">
    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1.5" role="tablist" aria-orientation="horizontal">
      <SectionsNavElement
          v-for="menuItem in menuItems"
          @click="selectItem(menuItem.id)"
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
import {onMounted, ref} from "vue";
import {useSettingsStore} from "~/stores/settings";

const settingsStore = useSettingsStore();
const selected = ref(settingsStore.selectedSection)
const menuItems = [
  {id: 1, label: "مواقيت الصلوات", route: "#", name: "salatetimes"},
  {id: 2, label: "الإعدادات", route: "#", name: "settings"},
]

onMounted(() => {
  selectItem(settingsStore.selectedSection)
})

const selectItem = (i) => {
  i === false ? i = 1 : null;

  selected.value = i
  settingsStore.updateSelectedSection(i)

  settingsStore.hideVisibilitySalateTimes()
  settingsStore.hideVisibilitySettings()

  switch (i) {
    case 1:
      settingsStore.showVisibilitySalateTimes()
      break
    case 2:
      settingsStore.showVisibilitySettings()
      break
    default:
      settingsStore.showVisibilitySalateTimes()
  }
}
</script>
