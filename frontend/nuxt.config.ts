// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content', '@nuxtjs/tailwindcss'],
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
})
