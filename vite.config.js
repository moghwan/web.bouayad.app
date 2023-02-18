import { fileURLToPath, URL } from "node:url";
import webp from 'vite-plugin-webp';

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      webp({
        include: fileURLToPath(new URL("./src", import.meta.url)),
        declude: fileURLToPath(new URL("./src/assets/img/favicon.png", import.meta.url)),
        imageType: ['.png', '.jpg']
      })
  ],
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
