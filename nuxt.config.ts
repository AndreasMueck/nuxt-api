// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: false
    },
    modules: [
        '@nuxt/image',
        '@nuxt/content',
        '@vee-validate/nuxt',
    ],
    css: [
        'vue-json-pretty/lib/styles.css', // vue-json-pretty Darstellung
        'primevue/resources/primevue.css', // primevue
        'primevue/resources/themes/saga-blue/theme.css', // primevue thema
        'primeicons/primeicons.css', // icons von primevue
        'primeflex/primeflex.css', // css utilities von primevue
        '@/assets/sass/theme.scss' // eigenes stylesheet
    ],
    build: {
        transpile: ['primevue'],
    },
    //ssr: false,
    experimental: {
        payloadExtraction: false
    },
    image: {
        presets: {
            avatar: {
                modifiers: {
                    format: 'png',
                    quality: '100',
                }
            }
        },
        format: ['webp'],
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
        }
    },
})
