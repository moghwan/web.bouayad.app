import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"

export const useSettingsStore = defineStore("settings", () => {
    const selectedSection = ref(useLocalStorage('selectedSection', 1));
    const selectedCities = ref(useLocalStorage('selectedCities', []));
    
    const displayMode = ref(useLocalStorage('displayMode', false));
    const showSalateTimes = ref(useLocalStorage('showSalateTimes', false));
    const showSettings = ref(useLocalStorage('showSettings', false));
    
    const updateSelectedSection = (id) => {
        selectedSection.value = id
    }
    const updateSelectedCities = (cities) => {
        selectedCities.value = cities
    }
    const switchDisplayMode = () => displayMode.value = !displayMode.value;
    // const showDisplayMode = () => displayMode.value = true;
    // const hideDisplayMode = () => displayMode.value = false;
   
    const switchVisibilitySalateTimes = () => showSalateTimes.value = !showSalateTimes.value;
    const showVisibilitySalateTimes = () => showSalateTimes.value = true;
    const hideVisibilitySalateTimes = () => showSalateTimes.value = false;
   
    const switchVisibilitySettings = () => showSettings.value = !showSettings.value;
    const showVisibilitySettings = () => showSettings.value = true;
    const hideVisibilitySettings = () => showSettings.value = false;
    
    return { 
        displayMode, switchDisplayMode,
        showSalateTimes, switchVisibilitySalateTimes, showVisibilitySalateTimes, hideVisibilitySalateTimes,
        showSettings, switchVisibilitySettings, showVisibilitySettings, hideVisibilitySettings,
        selectedSection, updateSelectedSection,
        selectedCities, updateSelectedCities,
    };
});
