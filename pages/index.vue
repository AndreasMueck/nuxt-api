<script setup>
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const runtimeConfig = useRuntimeConfig()

definePageMeta({
    middleware: 'auth', // Zugriff auf Seite index.vue nur als berechtigter User
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

//const postUrl = 'https://directus8:8890/huawei/items/golfcup2023'
const apiUrl = runtimeConfig.public.NUXT_PUBLIC_API
const postUrl = apiUrl + '/items/golfcup2023'


// Allgemeine reactive Variablen
const error = ref() // Error
const data = ref() // Daten
const pending = ref() // In Bearbeitung
const showForm = ref(true) // Zeige Form
const mailError = ref('') // Fehlermeldung für E-Mail-Eingabe Fehler
const btnDisabled = ref(false); // Speichern Button default: deaktiviert

// Select-Optionen Anrede im Formular, muss nicht reactive sein, daher kein ref oder reactive object
const optionsAnrede = [
    { value: 'Neutral', text: 'Keine Angabe' },
    { value: 'Frau', text: 'Frau' },
    { value: 'Herr', text: 'Herr' },
]

// Form Daten in reactives Object form
const form = reactive({
    veranstaltung: '',
    anrede: '',
    name: 'name_',
    vorname: 'vorname_',
    email: ''
})

// Sende Daten an Server
const onSubmit = async () => {

    if (mailError.value != true) {

        if (mailError.value == 'EMAIL_FORMAT_NOT_OK') {
            toast.add({ severity: 'error', summary: 'Fehler', detail: 'E-Mail Format ist nicht ok', life: 5050 })
        }

        if (mailError.value == 'EMAIL_ALREADY_EXISTS') {
            toast.add({ severity: 'error', summary: 'Fehler', detail: 'Die E-Mail ist schon gespeichert worden', life: 5050 })
        }

    } else {

        const accessToken = useState('accessToken')
        await useLazyFetch(postUrl, {
            method: 'POST',
            //headers: authHeader(), // TODO Warum funktioniert mein Composable authHeader() in UTILS nicht? Später klären!
            headers: { 'Authorization': 'Bearer ' + accessToken.value },
            body: JSON.stringify(form)
        })
            .then(response => {

                // console.log(JSON.stringify(response.data.value.data)) // Liefert kompletten Datensatz
                // console.log(JSON.stringify(response.data.value.data.id)) // Liefert Datensatz ID

                const responseData = response.data.value
                const responseError = response.error.value

                if (responseError) {
                    toast.add({ severity: 'error', summary: 'Fehler', detail: 'Ihre Daten wurden nicht gespeichert!', life: 5050 })
                    error.value = responseError // nutze error-ref für die Ausgabe im Template
                    showForm.value = false
                } else {
                    toast.add({ severity: 'success', summary: 'Speichern', detail: 'Ihre Daten wurden gespeichert!', life: 5000 })
                    data.value = responseData // nutze data-ref für die Ausgabe im Template
                    showForm.value = false
                }

            }, error => {
                console.log('Ausnahmefehler...')
                console.log(error)
            })
    }
}

// watchEffect(() => {
//     console.log('Anrede: ', form.anrede); // Value von Option in Anrede
// });

watch(
    () => form.email,
    async (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

            // Emaileingabe ist gültig
            mailError.value = (true)

            // Check: Email ist ok, ist ein Datensatz mit dieser Email bereits vorhanden?
            const accessToken = useState('accessToken')
            const emailCheckUrl = apiUrl + '/items/golfcup2023?filter[email]=' + email + '&single=1'
            const { pending, data } = await useLazyFetch(emailCheckUrl, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + accessToken.value }
            })

            if (data.value) { // data.value ist nicht leer, ergo E-Mail ist vorhanden
                mailError.value = ('EMAIL_ALREADY_EXISTS')
            }

        } else {
            mailError.value = ('EMAIL_FORMAT_NOT_OK')
        }
    }
)

</script>

<template>
    <div>
        <nuxt-link to="/info">INFO</nuxt-link><br />
        <nuxt-link to="/login">Zurück zu Login</nuxt-link><br />
        <nuxt-link to="/vee1">Hin zu vee1</nuxt-link>
        <LoginImage />
        <template v-if="data">
            <div class="center-form">
                <h3>Daten wurden gespeichert</h3>
            </div>
            <div class="center-form-green">
                Kontrolle: Die Daten kommen als Rückmeldung des Servers<br>
                <myJson :data="data" :showIcon="true" />
            </div>
            <br /><br />
        </template>
        <template v-if="error">
            <h1>Fehler</h1>
            <div class="false message">{{ error }}</div>
        </template>
        <template v-if="showForm">
            <form @submit.prevent="onSubmit">
                <div class="center-form">
                    <h3>User ist authentifiziert, Formular wird angezeigt!</h3>

                    <div class="flex flex-wrap gap-3">
                        <div class="flex">
                            <RadioButton v-model="form.veranstaltung" id="event1" inputId="event1" name="form.veranstaltung"
                                value="Veranstaltung 111" required />
                            <label for="event1" class="ml-2">Veranstaltung 1</label>
                        </div>
                        <div class="flex">
                            <RadioButton v-model="form.veranstaltung" id="event2" inputId="event2" name="form.veranstaltung"
                                value="Veranstaltung 222" />
                            <label for="event2" class="ml-2">Veranstaltung 2</label>
                        </div>
                    </div>
                    <br><br>
                    <Dropdown v-model="form.anrede" :options="optionsAnrede" optionLabel="text" optionValue="value"
                        placeholder="Anrede wählen ..." required class="w-full md:w-14rem" />
                    <br><br>

                    <span class="p-input-icon-left">
                        <i class="pi pi-user" />
                        <InputText type="text" v-model="form.name" name="name" placeholder="name" required
                            class="w-full md:w-14rem" />
                    </span>
                    <br><br>
                    <span class="p-input-icon-left">
                        <i class="pi pi-user" />
                        <InputText type="text" v-model="form.vorname" name="vorname" placeholder="vorname" required
                            class="w-full md:w-14rem" />
                    </span>
                    <br><br>
                    <span class="p-input-icon-left">
                        <i class="pi pi-send" />
                        <InputText type="text" v-model="form.email" name="email" placeholder="E-Mail eingeben ..." required
                            class="w-full md:w-14rem" />
                    </span>
                    <div v-if="pending">Checke E-Mail ...</div>
                    <br /><br />

                    <div class="button-bar">
                        <Button type="submit" :disabled="btnDisabled" label="Speichern" icon="pi pi-save"></Button>
                    </div>

                </div>
                <div class="center-form-green">
                    Eingabekontrolle<br>
                    <myJson :data="form" :showIcon="true" />
                </div>
            </form>
        </template>
    </div>
</template>

<style>
.center-form {
    margin: auto;
    width: 50%;
    padding: 10px;
    word-wrap: break-word;
}

.center-form-green {
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