export default defineNuxtPlugin({
  name: 'theme-plugin',
  enforce: 'pre', // Run before other plugins
  setup() {
    // Initialize the theme as early as possible using localStorage directly
    // This avoids the issue with Pinia not being initialized yet
    const applyThemeFromLocalStorage = () => {
      try {
        // Get theme from localStorage - check both plain key and vueuse prefixed key
        let theme = localStorage.getItem('theme');
        if (!theme) {
          // Try with vueuse prefix
          theme = localStorage.getItem('vueuse-theme');
        }
        // Default to system if not found
        theme = theme ? JSON.parse(theme) : 'system';
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Determine if dark mode should be active
        const isDarkMode = theme === 'system' 
          ? prefersDark 
          : (theme === 'dark' || theme === 'amoled');

        // Determine if amoled mode should be active
        const isAmoledMode = theme === 'amoled';

        // Apply the appropriate classes
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        if (isAmoledMode) {
          document.documentElement.classList.add('amoled');
        } else {
          document.documentElement.classList.remove('amoled');
        }
      } catch (error) {
        console.error('Error applying theme from localStorage:', error);
      }
    };

    // Apply theme immediately
    if (process.client) {
      applyThemeFromLocalStorage();

      // Set up a listener for localStorage changes
      window.addEventListener('storage', (event) => {
        if (event.key === 'theme' || event.key === 'vueuse-theme') {
          applyThemeFromLocalStorage();
        }
      });
    }

    // Return empty object as we don't need to expose anything
    return {};
  }
});
