<script setup>
import { ref, useLazyFetch } from "#imports";
import { useToast } from "primevue/usetoast";
import { KachelService } from '@/service/KachelService';

/**
 * APP Konfiguration
 */

const runtimeConfig = useRuntimeConfig()
const apiUrl = runtimeConfig.public.NUXT_PUBLIC_API

const toast = useToast();
const kacheln = KachelService;

// accessToken mit NULL initialisiert // useState ist nicht reaktiv in bezug auf HMR
const accessToken = useState("accessToken", () => "");
// User ist nicht authentifiziert
const isAuthenticated = useState("authenticated", () => false);
// Create API route for authentification
const authUrl = apiUrl + '/auth/authenticate';

// Testing für dynamische Änderungen an der Seite
const isActive = ref(false) // Wechsel Background-Color und Komponenten-Tausch
const loading = ref(false); // Spin loader in button AUS

// composables testing
const hello = useHello() // export named
const helloMars = useHelloMars() // export unnamed -> Dateiname wird zum Funktionsnamen

const pending = ref();
const data = ref();
const error = ref();

const formBody = ref({
    /**
     * Werte initialiseren die Input Felder -> automatisch ausgefüllt
     * Für den Requestboy wird aber email erstellt: 'golfcup2023@wak-online.de' 
     * Directus lässt nur emails als Benutzernamen für Temporary Access Token zu
     * https://v8.docs.directus.io/api/authentication.html#tokens
     */
    email: "golfcup2023",
    password: "handicap",
});

// Ref object für den request body
const requestBody = ref({
    email: "",
    password: "",
});

/**
 * Page Konfiguration
 */

useHead({
    link: [{ rel: 'canonical', href: 'http://localhost:3000/' }],
    htmlAttrs: { lang: 'de' },
    bodyAttrs: {
        class: computed(() => { // Background auf Klick ändern
            return (isActive.value ? 'backclass' : '')
        })
    }
});

useSeoMeta({
    title: 'Login Auth',
    description: 'Hier ist eine Website mit Nuxt Hier ist eine Website mit Nuxt Hier ist eine Website mit Nuxt',
    // Opengraph
    ogTitle: 'My Amazing Site',
    ogDescription: 'Hier ist eine Website mit Nuxt Hier ist eine Website mit Nuxt Hier ist eine Website mit Nuxt',
    ogImage: 'https://ps.w.org/wonderm00ns-simple-facebook-open-graph-tags/assets/banner-1544x500.png',
    ogType: 'website',
    ogUrl: 'http://localhost:3000',
    ogLocale: 'de_DE',
    // Twitter
    twitterCard: 'summary_large_image',
})

definePageMeta({
    //layout: "custom",
});

/**
 * Page actions
 */

const login = async () => {
    loading.value = true; // Spin loader in button AN
    requestBody.value.email = formBody.value.email + "@wak-online.de";
    requestBody.value.password = formBody.value.password;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: requestBody,
    };

    //const { data, error } = await useLazyFetch(authUrl, {
    await useLazyFetch(authUrl, requestOptions).then((res) => {
        // response object: data, error, execute, pending, refresh

        const resData = res.data.value;
        const resError = res.error.value;
        if (resError) {
            loading.value = false; // Spin loader in button AUS
            error.value = resError; // nutze error-ref für die Ausgabe im Template
            toast.add({ severity: "error", summary: "Fehler", detail: "Ungültige Anmeldedaten", life: 5000 });
        } else {
            data.value = resData; // nutze data-ref für die Ausgabe im Template
            accessToken.value = resData.data.token; // schreibe das gelieferte Access Token in useState
            isAuthenticated.value = true; // isAuthenticated flag wird gesetzt. User ist authentifiziert und kann das Formular ausfüllen
            return navigateTo("/"); // redirect auf die Formularseite, da User authentifiziert ist
        }
    });
};

/**
 * Tests
 */

const label = ref("Provided: Absenden");
provide("key", label); // Deaktivieren dann wird der default-wert aus dem Inject genommen

const AppTable = resolveComponent('AppTable')
const AppTabulator = resolveComponent('AppTabulator')

const $endTime = Date.now() + 1000 * 60 * 60 * 24 * 7; // UNIX-Timestamp

</script>

<template>
    <div class="card">
        <div class="flex justify-content-center flex-wrap card-container blue-container">
            <div class="card sm:w-9 md:w-6">
                <!-- COUNTDOWN-COMPONENTE ANFANG -->
                <!-- endTime als Prop übergeben - Durch v-slot meldet Kind-Komponente Daten zurück an Eltern-Komponente, die hier ist -->
                <ClientOnly>
                    <Countdown v-slot="{ days, hours, minutes, seconds }" :timestamp="$endTime">
                        <!-- destructuring des zeit-objekts -->
                        <h2>{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</h2>
                    </Countdown>
                </ClientOnly>
                <!-- COUNTDOWN-COMPONENTE ENDE -->
                <h1>Login</h1>
                <div>
                    ( UI: PrimeVue / Theme: saga-blue / Font: Lato )
                </div>
                <form @submit.prevent="login">
                    <div>
                        <div>
                            <LoginImage />

                        </div>
                        <div class="field">
                            <label for="username">Benutzername</label>
                            <input id="username" type="text" v-model.lazy="formBody.email"
                                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div class="field">
                            <label for="password">Passwort</label>
                            <input id="password" type="password" v-model.lazy="formBody.password" autocomplete="off"
                                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div class="button-bar">
                            <Button type="submit" label="Anmelden" icon="pi pi-user" :loading="loading"></Button>
                            <Button type="reset" label="Standartwerte laden" icon="pi pi-times"
                                class="p-button-secondary" />
                            <Button label="Komponente, Schriftgrösse und Hintergrundfarbe ändern" class="p-button-secondary"
                                @click="isActive = !isActive" />
                        </div>
                        <div>
                            <p :class="{ gross: isActive }">Komponente, Schriftgrösse und Hintergrundfarbe geändert</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div>
        <!-- <div class="center-error" v-if="error">
            Error status code: {{ error.statusCode }}<br>
            Error status message: {{ error.statusMessage }}<br>
            Error code: {{ error.data.error.code }}<br>
            Error message: {{ error.data.error.message }}
            </div> -->
        <!--<p>COMPOSABLES TEST<br />
            {{ hello }}<br />{{ helloMars }}</p>
        <p>Token:{{ accessToken }}</p>
        <div class="center-data" v-if="pending">
            <h1>Loading spinner ...</h1>
        </div> -->
        <!-- <div class="center-data" v-if="data">
            <h1>DATA:</h1>
            <myJson :data="data" :showIcon="true" />
        </div> -->
        <!-- <form @submit.prevent="login">
            <h1>Loginseite</h1>
            Benutzername: <input type="text" v-model.lazy="formBody.email"><br>
            Password: <input type="password" v-model.lazy="formBody.password" autocomplete="off"><br><br>
            <button type="submit">Anmelden</button>
            <MainButton type="submit" childclass="button grau">Anmelden (grauer Button)</MainButton>
        </form> -->
        <!-- <br><br>
        Testen von Button-Props, funktioniert!
        <br>
        <MainButton childclass="button rot">Roter Button ohne fallthrough attributes (hier mit props)</MainButton>
        <div>
            <ButtonTest class="gruen" id="test">Grüner Button mit fallthrough attributes (id,class,style)</ButtonTest>
        </div>-->
        <!--<div>
            <nuxt-link to="/veelidate">Veelidate</nuxt-link><br />
            <nuxt-link to="/radio">Radio</nuxt-link><br />
            <nuxt-link to="/vee">Vee</nuxt-link><br />
        </div>-->
        <div class="flex justify-content-center flex-wrap card-container blue-container">
            <div class="card sm:w-9 md:w-6">
                <component :is="isActive ? AppTable : AppTabulator"></component><br />
            </div>
        </div>
        <FooBar>
            <template #content="{ title, title1 }">
                Return von Kind-Komponente FooBar: {{ title }}<br />
                Return von Kind-Komponente FooBar: {{ title1 }}
            </template>
        </FooBar>

        <div>
            <!--
            <ul class="kachelnwidget__kachelwrapper kachelnwidget__kachelwrapper--lrg">
                <li class="kachelnwidget__item.kachelnwidget__item--lrg" v-for="item in kacheln.kachelnLrg">
                    <a class="kachelnwidget__link" :href="item.url">
                        <img class="kachelnwidget__img" :src="item.img" />
                    </a>
                </li>
            </ul>
            -->
            <!--
            <ul class="kachelnwidget__kachelwrapper kachelnwidget__kachelwrapper--md">
                <li class="kachelnwidget__item.kachelnwidget__item--md" v-for="item in kacheln.kachelnMd">
                    <a class="kachelnwidget__link" :href="item.url">
                        <img class="kachelnwidget__img" :src="item.img" />
                    </a>
                </li>
            </ul>
            -->
            <ul class="kachelnwidget__kachelwrapper kachelnwidget__kachelwrapper--sml">
                <li class="kachelnwidget__item.kachelnwidget__item--sml" v-for="item in kacheln.kachelnSml">
                    <a class="kachelnwidget__link" :href="item.url">
                        <img class="kachelnwidget__img" :src="item.img" />
                    </a>
                </li>
            </ul>
        </div>
        <!-- <VideoFullwidth filename="placeholder" />-->
    </div>
</template>

<style>
.backclass {
    background-color: lightgray;
}
</style>

<style scoped>
.gross {
    font-size: 30px;
}

.button-bar {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

.center-data {
    margin: auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
    word-wrap: break-word;
}

.center-error {
    margin: auto;
    width: 50%;
    border: 3px solid red;
    padding: 10px;
}

.gruen {
    background-color: green;
}
</style>
