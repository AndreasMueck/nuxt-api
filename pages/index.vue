<script setup>

import { useToast } from 'primevue/usetoast'
const toast = useToast()

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

// Allgemeine reactive Variablen
const error = ref() // Error
const data = ref() // Daten
const pending = ref() // In Bearbeitung
const showForm = ref(true) // Zeige Form
const mailError = ref('') // Fehlermeldung für E-Mail-Eingabe Fehler
const btnDisabled = ref(true); // Speichern Button default: deaktiviert

// Select-Optionen Anrede im Formular, muss nicht reactive sein, daher kein ref oder reactive object
const optionsAnrede = [
    { value: 'Frau', text: 'Frau' },
    { value: 'Herr', text: 'Herr' }
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
    const accessToken = useState('accessToken')

    await useLazyFetch(postUrl, {
        method: 'POST',
        //headers: authHeader(), // Warum funktioniert mein Composable authHeader() in UTILS nicht? Später klären!
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
                toast.add({ severity: 'error', summary: 'Fehler', detail: 'Fehler beim Versenden der E-Mail!', life: 5050 })
                data.value = responseData // nutze data-ref für die Ausgabe im Template
                showForm.value = false
            }

        }, error => {
            console.log('exception...')
            console.log(error)
        })

}

function validateField(value) {
    if (!value) {
        return 'Value is required.';
    }

    return true;
}


// watchEffect(() => {
//     console.log('Anrede: ', form.anrede); // Value von Option in Anrede
// });

watch(
    () => form.email,
    async (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            // Emaileingabe ist gültig
            console.log(`email ist: ${email}`)
            mailError.value = ('')

            // Ist ein Datensatz mit dieser Email bereits vorhanden?
            const accessToken = useState('accessToken')
            const emailCheckUrl = 'http://directus8/huawei/items/golfcup2023?filter[email]=' + email + '&single=1'
            const { pending, data } = await useLazyFetch(emailCheckUrl, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + accessToken.value }
            })
            if (data.value) { // data.value ist nicht leer, ergo E-Mail ist vorhanden
                mailError.value = ('Email ist bereits vorhanden')
                btnDisabled.value = true;
            } else {
                btnDisabled.value = false;
            }

        } else {
            console.log('Nope')
            mailError.value = ('Bitte eine gültige Email eingeben')
            btnDisabled.value = true;
        }
    }
)

</script>

<template>
    <div>
        <nuxt-link to="/login">Zurück zu Login</nuxt-link>
        <LoginImage />
        <template v-if="data">
            <div class="center-form">
                <h3>Daten wurden gespeichert</h3>
            </div>
            <div class="center-form-green">
                Kontrolle: Rückmeldung des Servers<br>
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
                        <div class="flex align-items-center">
                            <RadioButton v-model="form.veranstaltung" id="event1" inputId="event1" name="form.veranstaltung"
                                value="Veranstaltung 111" required />
                            <label for="event1" class="ml-2">Veranstaltung 1</label>
                        </div>
                        <div class="flex align-items-center">
                            <RadioButton v-model="form.veranstaltung" id="event2" inputId="event2" name="form.veranstaltung"
                                value="Veranstaltung 222" />
                            <label for="event2" class="ml-2">Veranstaltung 2</label>
                        </div>
                    </div>
                    <br><br>
                    <Dropdown v-model="form.anrede" :options="optionsAnrede" optionLabel="value" optionValue="text"
                        placeholder="Anrede wählen ..." required class="w-full md:w-14rem" />
                    <br><br>

                    <!-- <div class="p-inputgroup flex-1 md:w-14rem">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                        </span>
                        <InputText type="text" v-model="form.name" name="name" placeholder="name" required />
                    </div> -->

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
                    <span v-if="mailError" class="false">&nbsp;&nbsp;{{ mailError }}</span>
                    <br /><br />

                    <div class="button-bar">
                        <!--<Button type="submit" :disabled="disabled">Speichern</Button>-->
                        <Button type="submit" :disabled="btnDisabled" label="Speichern" icon="pi pi-save"></Button>
                    </div>

                </div>
                <div class="center-form-green">
                    Eingabekontrolle<br>
                    <myJson :data="form" :showIcon="true" />
                </div>
            </form>
            <!-- Toast für Nachrichten-->
            <Toast position="top-center" />
            <br /><br />
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