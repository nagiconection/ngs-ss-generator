// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify'],
  },
  plugins: ['~/plugins/firebase'],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@use 'vuetify/settings' with ($body-font-family: 'Roboto', sans-serif);`,
        },
      },
    },
  },
  ssr: false,
  nitro: {
    preset: 'static',
  },
  runtimeConfig: {
    firebaseServiceAccount: process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    },
  },
})
