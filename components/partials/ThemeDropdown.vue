<template>
  <div>
    <button id="dropdownThemeButton"
            @click="clicked = !clicked"
            data-dropdown-toggle="dropdownTheme"
            data-dropdown-placement="bottom"
            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            type="button">
      {{ getThemeLabel(currentTheme) }}
      <IconCaretDown class="w-5 h-5 text-white"/>
    </button>

    <!-- Dropdown menu -->
    <div dir="rtl" id="dropdownTheme" class="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700" v-show="clicked">
      <ul v-auto-animate class="py-2 px-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownThemeButton">
        <li v-for="theme in themeOptions" :key="theme.value">
          <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label :for="'radio-item-' + theme.value"
                   class="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
              {{ theme.label }}
            </label>
            <input @change="updateTheme(theme.value)" :id="'radio-item-' + theme.value"
                   type="radio" :checked="currentTheme === theme.value" name="theme-option"
                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useSettingsStore } from "~/stores/settings";
import { IconCaretDown } from "@tabler/icons-vue";
import { vAutoAnimate } from '@formkit/auto-animate';

const settingsStore = useSettingsStore();
const clicked = ref(false);
const currentTheme = computed(() => settingsStore.theme);

const themeOptions = [
  { value: 'system', label: 'تلقائي (حسب إعدادات النظام)' },
  { value: 'light', label: 'وضع النهار' },
  { value: 'dark', label: 'وضع الليل' },
  { value: 'amoled', label: 'وضع الليل (AMOLED)' }
];

const updateTheme = (theme) => {
  settingsStore.updateTheme(theme);
  clicked.value = false; // Close dropdown after selection
};

const getThemeLabel = (themeValue) => {
  const theme = themeOptions.find(t => t.value === themeValue);
  return theme ? theme.label : themeOptions[0].label;
};
</script>
