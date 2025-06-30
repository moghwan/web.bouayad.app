// import { useSettingsStore } from '~/stores/settings';

export default defineNuxtPlugin({
  name: 'theme-plugin',
  enforce: 'pre', // Run before other plugins
  setup() {
    // Initialize the theme as early as possible
    // const settingsStore = useSettingsStore();
    
    // // Apply the theme based on the stored preference
    // const applyTheme = () => {
    //   if (settingsStore.isDarkMode) {
    //     document.documentElement.classList.add('dark');
    //   } else {
    //     document.documentElement.classList.remove('dark');
    //   }
    //
    //   if (settingsStore.isAmoledMode) {
    //     document.documentElement.classList.add('amoled');
    //   } else {
    //     document.documentElement.classList.remove('amoled');
    //   }
    // };
    //
    // // Apply theme immediately
    // applyTheme();
    
    // Return empty object as we don't need to expose anything
    return {};
  }
});