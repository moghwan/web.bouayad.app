<template>
    <button
      type="button"
      @click="selectItem(id)"
      :aria-selected="selected === id"
      :class="selected === id ? 'bg-white shadow' : null"
      class="flex items-center rounded-md py-4 px-4 text-sm font-semibold lg:pr-3"
    >
        <span class="sr-only lg:not-sr-only lg:ml-2 text-slate-900">{{ label }}</span>
        <IconMoonFilled v-if="name === 'ramadanmode'" :color="selected === id ? 'black' : 'gray'" />
        <IconClock2 v-if="name === 'salatetimes'" :color="selected === id ? 'black' : 'gray'" />
        <IconSettings v-if="name === 'settings'" :color="selected === id ? 'black' : 'gray'" />

    </button>
</template>

<script setup>
import {IconClock2, IconMoonFilled, IconSettings} from "@tabler/icons-vue";
import {useSettingsStore} from "@/stores/settings";

const emit = defineEmits(['parent-selectnavitem'])
const settingsStore = useSettingsStore();

const props = defineProps({
    selected: { required: true },
    label: {required: true },
    id: {required: true },
    route: {required: true },
    name: {required: true },
});

const selectItem = (i) => {
    emit('parent-selectnavitem', i);
    settingsStore.updateSelectedSection(i)
    
    settingsStore.hideVisibilitySalateTimes()
    settingsStore.hideVisibilityRamadanDashboard()
    settingsStore.hideVisibilitySettings()
    
    props.name === 'ramadanmode' ? settingsStore.showVisibilityRamadanDashboard() : null
    props.name === 'salatetimes' ? settingsStore.showVisibilitySalateTimes() : null
    props.name === 'settings' ? settingsStore.showVisibilitySettings() : null
}
</script>