// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  sourcemap: {
    server: true,
    client: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-svgo",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@nuxtjs/device",
  ],
  css: ["~/assets/css/main.css"],
  build: {
    transpile: ["gsap"],
  },
});