import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-21',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      baseURL: "/",
      htmlAttrs: { lang: 'en' },
      title: 'Ayushman Sethy | Software Engineer',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#102a24' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})
