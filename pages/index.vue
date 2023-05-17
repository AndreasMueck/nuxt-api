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

const postUrl = 'http://directus8/huawei/items/golfcup2023'

const error = ref()
const data = ref()
const pending = ref()
const formular = ref(true)
const mailError = ref('')
const isOff = ref(true)

const options = [
    { value: 'Frau', text: "Frau" },
    { value: 'Herr', text: "Herr" }
]

const form = reactive({
    veranstaltung: '',
    anrede: 'Frau',
    name: 'name_',
    vorname: 'vorname_',
    email: 'mueck@wak-online'
})

const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(form),
}

const disabled = computed(() => isOff.value);

const post = async () => {
    const accessToken = useState('accessToken')

    await useLazyFetch(postUrl, {
        method: 'POST',
        //headers: authHeader(),
        headers: { 'Authorization': 'Bearer ' + accessToken.value },
        body: JSON.stringify(form)
    })
        .then(response => {

            // console.log(JSON.stringify(response.data.value.data)) // Liefert kompletten Datensatz
            // console.log(JSON.stringify(response.data.value.data.id)) // Liefert Datensatz ID

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

watch(
    () => form.email,
    async (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            // Emaileingabe ist gültig
            console.log(`email ist: ${email}`)
            mailError.value = ('')

            const accessToken = useState('accessToken')
            // Ist ein Datensatz mit dieser Email bereits vorhanden?
            const emailCheckUrl = 'http://directus8/huawei/items/golfcup2023?filter[email]=' + email + '&single=1'
            const { pending, data } = await useLazyFetch(emailCheckUrl, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + accessToken.value }
            })
            if (data.value) {
                mailError.value = ('Email ist bereits vorhanden')
                isOff.value = true
            } else {
                isOff.value = false
            }

        } else {
            console.log('Nope')
            mailError.value = ('Bitte eine gültige Email eingeben')
            isOff.value = true
        }
    }
)

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
                    <input v-model="form.name" name="name" placeholder="name" required />
                    <br><br>
                    <input v-model="form.vorname" name="vorname" placeholder="vorname" required />
                    <br><br>
                    <input v-model="form.email" name="email" type="email" placeholder="E-Mail eingeben ..." required />
                    <div v-if="pending">Checke E-Mail ...</div>
                    <div v-if="mailError">{{ mailError }}</div>
                    <br><br>
                    <myJson :data="form" :showIcon="true" />
                </div>
                <button type="submit" :disabled="disabled">Speichern</button>
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