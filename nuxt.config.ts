import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['~/assets/sass/main.scss'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: process.env.BOUAYADAPP_API_SECRET,
    // Keys within public, will be also exposed to the client-side
    public: {
      apiHost: process.env.BOUAYADAPP_API_URL,
    }
  },

  compatibilityDate: '2024-09-22',

  devtools: {
    timeline: {
      enabled: true,
    },
  },
})