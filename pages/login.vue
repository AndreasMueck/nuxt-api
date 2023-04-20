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
    email: 'golfcup2023@wak-online.de',
    password: 'handicap'
});

const requestBody = ref({
    email: '',
    password: ''
});

const login = async () => {

    requestBody.value = formBody.value;
    //const { data, error } = await useLazyFetch(authUrl, {
    await useLazyFetch(authUrl, {
        method: 'POST',
        body: formBody,
        /* body: {
            email: 'golfcup2023@wak-online.de',
            password: 'handicap'
        } */
    }).then(res => {
        const res_data = res.data.value
        const res_error = res.error.value
        if (res_error) {    // show Error messages
            //console.log('Error: ' + JSON.stringify(error.statusCode + ' ' + error.statusMessage))
            //console.log('Error: ' + JSON.stringify(error.data.error.code + ' ' + error.data.error.message))
            error.value = res_error
        } else {        // show Data
            //console.log('Data: ' + JSON.stringify(data.data.token))
            data.value = res_data // data für die Ausgabe am Bildschirm
            accessToken.value = res_data.data.token // speichere Access Token in useState
            isAuthenticated.value = true // User ist authentifiziert und kann das Formular ausfüllen
            //return navigateTo('/');
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
            Input email: <input type="text" v-model.lazy="formBody.email" required><br>
            Input password: <input type="password" v-model.lazy="formBody.password" autocomplete="off"><br>
            <button type="submit" :disabled="!formBody.email || !formBody.password">Login</button>
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