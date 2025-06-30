import { ref, computed, onMounted, watch } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage, usePreferredDark } from "@vueuse/core"

// Theme options
export type ThemeOption = 'system' | 'light' | 'dark' | 'amoled';

export const useSettingsStore = defineStore("settings", () => {
    const selectedSection = ref(useLocalStorage('selectedSection', 1));
    const selectedCities = ref(useLocalStorage('selectedCities', []));

    const displayMode = ref(useLocalStorage('displayMode', false));
    const showSalateTimes = ref(useLocalStorage('showSalateTimes', false));
    const showSettings = ref(useLocalStorage('showSettings', false));

    // Theme management
    const theme = ref<ThemeOption>(useLocalStorage('theme', 'system'));
    const isSystemDark = usePreferredDark();

    // Computed property to determine if dark mode should be active
    const isDarkMode = computed(() => {
        if (theme.value === 'system') {
            return isSystemDark.value;
        }
        return theme.value === 'dark' || theme.value === 'amoled';
    });

    // Computed property to determine if amoled dark mode should be active
    const isAmoledMode = computed(() => {
        return theme.value === 'amoled';
    });

    // Method to update the theme
    const updateTheme = (newTheme: ThemeOption) => {
        theme.value = newTheme;
    };

    // Apply theme classes to document
    const applyTheme = () => {
        if (isDarkMode.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        if (isAmoledMode.value) {
            document.documentElement.classList.add('amoled');
        } else {
            document.documentElement.classList.remove('amoled');
        }
    };

    // Watch for theme changes and apply them
    watch([isDarkMode, isAmoledMode], () => {
        applyTheme();
    });

    // Apply theme on mount
    onMounted(() => {
        applyTheme();
    });

    const updateSelectedSection = (id: any) => {
        selectedSection.value = id
    }
    const updateSelectedCities = (cities: any) => {
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
        // Theme related exports
        theme, isDarkMode, isAmoledMode, updateTheme,
    };
});
