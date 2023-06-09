// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/image-edge', '@nuxt/content'],
    css: [
        'vue-json-pretty/lib/styles.css',
        'primevue/resources/themes/saga-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        '@/assets/_theme.scss'
    ],
    build: {
        transpile: ['primevue']
    },
    //ssr: false,
    experimental: {
        payloadExtraction: false
    },
    image: {
        presets: {
            avatar: {
                modifiers: {
                    format: 'jpg',
                    quality: '60',
                }
            }
        },
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
        }
    }
})