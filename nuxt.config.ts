// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    ssr: false,
    modules: ["@nuxt/ui"],
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],

    runtimeConfig: {
        // Clés privées (disponibles uniquement côté serveur)
        gmailUser: process.env.GMAIL_USER,
        gmailPass: process.env.GMAIL_PASS,

        public: {
            // Clés publiques (si besoin côté navigateur)
        },
    },
});
