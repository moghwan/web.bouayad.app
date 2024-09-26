import { fileURLToPath, URL } from "node:url";
import { VitePWA } from 'vite-plugin-pwa';

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'اليومية العصرية',
          short_name: 'اليومية العصرية',
          description: 'اليومية العصرية للحاج بوعياد هي يومية من التراث المغربي تحتوي على مجموعة من الاحاديث والآيات القرآنية اضافة الى فوائد طبية وأقوال مأثورة',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        },
        devOptions: {
          enabled: true
        }
      }),
  ],
  define: {
    'displayModes': {
      'isFull': false,
    },
    'process.env': process.env
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
