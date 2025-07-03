// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: false,
  modules: ['@nuxt/ui'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
})
