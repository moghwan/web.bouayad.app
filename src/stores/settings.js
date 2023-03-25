import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"

export const useDisplayModeStore = defineStore("displayMode", () => {
    const displayMode = ref(useLocalStorage('displayMode', displayModes.full));

    function switchMode() {
        displayMode.value = !displayMode.value;
        return displayMode.value
    }

    return { displayMode, switchMode};
});