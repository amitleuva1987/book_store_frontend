export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "packt-frontend",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
  ],

  axios: {
    credentials: true,
    baseURL: "http://localhost",
    headers: {
      accept: "application/json",
    },
  },

  auth: {
    redirect: {
      login: "/login",
      logout: "/login",
      home: "/",
    },
    strategies: {
      cookie: {
        provider: "laravel/sanctum",
        url: "http://localhost",
        endpoints: {
          csrf: {
            url: "/sanctum/csrf-cookie",
          },
          login: {
            url: "/api/login",
          },
          logout: {
            url: "/api/logout",
          },
          user: {
            url: "/api/user",
          },
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
