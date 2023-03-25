import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"

export const useDisplayModeStore = defineStore("displayMode", () => {
    const displayMode = ref(useLocalStorage('displayMode', displayModes.isFull));
    const switchMode = () => displayMode.value = !displayMode.value;
    return { displayMode, switchMode};
});

export const useRamadanModeStore = defineStore("ramadanDashboard", () => {
    const showRamadanDashboard = ref(useLocalStorage('showRamadanDashboard', false));
    const switchVisibility = () => showRamadanDashboard.value = !showRamadanDashboard.value;
    return { showRamadanDashboard, switchVisibility};
});

export const useSalateTimesStore = defineStore("salateTimes", () => {
    const showSalateTimes = ref(useLocalStorage('showSalateTimes', false));
    const switchVisibility = () => showSalateTimes.value = !showSalateTimes.value;
    return { showSalateTimes, switchVisibility};
});