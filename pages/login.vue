<script setup>
import { ref, useLazyFetch } from "#imports";

const accessToken = useState('access-token', () => ''); // accessToken mit NULL initialisiert // useState ist nicht reaktiv in bezug auf HMR
const isAuthenticated = useState('authenticated', () => false); // User ist nicht authentifiziert

const authUrl = 'http://directus8/huawei/auth/authenticate'

useHead({
    title: 'Login Auth'
})

// composables testing
//const hello = useHello()
//const helloWorld = useHelloWorld()

const pending = ref();
const data = ref();
const error = ref();

const formBody = ref({
    // Werte initialiseren die Input Felder -> automatisch ausgefüllt
    //email: 'golfcup2023@wak-online.de',
    email: 'golfcup2023',
    password: 'handicap'
});

const requestBody = ref({ // Diese Angaben gehen in den Request-Body
    email: '',
    password: ''
});

const login = async () => {

    requestBody.value.email = formBody.value.email + '@wak-online.de'
    requestBody.value.password = formBody.value.password

    //const { data, error } = await useLazyFetch(authUrl, {
    await useLazyFetch(authUrl, {
        method: 'POST',
        body: requestBody,

    }).then(response => {
        const responseData = response.data.value
        const responseError = response.error.value
        if (responseError) {
            error.value = responseError // nutze error-ref für die Ausgabe im Template
        } else {
            data.value = responseData // nutze data-ref für die Ausgabe im Template
            accessToken.value = responseData.data.token // speichere Access Token in useState
            isAuthenticated.value = true // User ist authentifiziert und kann das Formular ausfüllen
            return navigateTo('/');
        }
    }, error => {
        console.log('exception...')
        console.log(error)
    })
}
</script>

<template>
    <div>
        <!-- <p>{{ hello }}</p><p>{{ helloWorld }}</p> -->
        <nuxt-link to="/">Indexseite</nuxt-link><br>
        <nuxt-link to="/test">Testseite</nuxt-link>
        <p>A:{{ accessToken }}</p>
        <div class="center-data" v-if="pending">
            <h1>Loading spinner ...</h1>
        </div>
        <div class="center-data" v-if="data">
            <h1>DATA:</h1>
            <myJson :data="data" :showIcon="true" />
            <!-- <pre>{{ data }}</pre> -->
        </div>
        <div class="center-error" v-if="error">
            Error status code: {{ error.statusCode }}<br>
            Error status message: {{ error.statusMessage }}<br>
            Error code: {{ error.data.error.code }}<br>
            Error message: {{ error.data.error.message }}
        </div>
        <form @submit.prevent="login" autocomplete="off">
            <h1>Loginseite</h1>
            Benutzername: <input type="text" v-model.lazy="formBody.email"><br>
            Password: <input type="password" v-model.lazy="formBody.password" autocomplete="off"><br>
            <!--<button type="submit" :disabled="!formBody.username || !formBody.password">Login</button>-->
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style>
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
</style>