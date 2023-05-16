<script setup>
definePageMeta({
    middleware: 'auth' // Zugriff auf Seite index.vue nur als berechtigter User
})

useHead({
    title: 'Formular Eingabe',
    meta: [
        { name: 'description', content: 'My amazing site.' }
    ],
    bodyAttrs: {
        class: 'test' // füge dynamisch die css Klasse dem body tag hinzu
    }
})

const error = ref()
const data = ref()
const formular = ref(true)

const options = [
    { value: 'Frau', text: "Frau" },
    { value: 'Herr', text: "Herr" }
]

const form = reactive({
    veranstaltung: '',
    anrede: '',
    name: '',
    vorname: ''
})

const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(form),
}

//console.log(requestOptions);

const postUrl = 'http://directus8/huawei/items/golfcup2023'
//const accessToken = useState('accessToken')

const post = async () => {
    // Data ist gesendet {"veranstaltung":"Veranstaltung 111","anrede":"Frau","name":"test"}
    //console.log('Data ist gesendet ' + JSON.stringify(form))

    const accessToken = useState('accessToken')

    await useLazyFetch(postUrl, {
        method: 'POST',
        //headers: authHeader(),
        headers: { 'Authorization': 'Bearer ' + accessToken.value },
        body: JSON.stringify(form)
    })
        .then(response => {

            //console.log(JSON.stringify(response.data.value.data)) 
            //{"id":11,"created_on":"2023-05-16T09:17:05+00:00","veranstaltung":"Veranstaltung 111","anrede":"Frau","name":"ffffff"}
            //console.log(JSON.stringify(response.data.value.data.id))
            //11

            const responseData = response.data.value
            const responseError = response.error.value

            if (responseError) {
                error.value = responseError // nutze error-ref für die Ausgabe im Template
                formular.value = false
            } else {
                data.value = responseData // nutze data-ref für die Ausgabe im Template
                formular.value = false
            }

        }, error => {
            console.log('exception...')
            console.log(error)
        })

}

</script>

<template>
    <div>
        <nuxt-link to="/login">Zurück zu Login</nuxt-link>
        <h1>User ist authentifiziert!<br>Formular wird angezeigt</h1>
        <template v-if="data">
            <h1>Daten wurden gespeichert</h1>
            <div class="true message">{{ data }}</div>
        </template>
        <template v-if="error">
            <h1>Fehler</h1>
            <div class="false message">{{ error }}</div>
        </template>
        <template v-if="formular">
            <form @submit.prevent="post">
                <div class="center-form">
                    <input type="radio" name="form.veranstaltung" id="one" value="Veranstaltung 111"
                        v-model="form.veranstaltung" required />
                    <label for="one">Veranstaltung 1</label>
                    <input type="radio" name="form.veranstaltung" id="two" value="Veranstaltung 222"
                        v-model="form.veranstaltung" />
                    <label for="two">Veranstaltung 2</label>
                    <br><br>
                    <select v-model="form.anrede" required>
                        <option disabled value="">Anrede wählen</option>
                        <option v-for="option in options" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                    <br><br>
                    <input v-model="form.name" placeholder="name" required />
                    <br><br>
                    <input v-model="form.vorname" placeholder="vorname" required />
                    <br>
                    <br>
                    <myJson :data="form" :showIcon="true" />
                </div>
                <button type="submit">Login</button>
            </form>
        </template>
    </div>
</template>

<style>
.center-form {
    margin: auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
    word-wrap: break-word;
}

.message {
    font-size: 24px;
}

.true {
    color: green;
}

.false {
    color: red;
}
</style>