<script setup>
definePageMeta({
    middleware: 'auth' // Zugriff auf Seite index.vue nur als berechtigter User
})

useHead({
    title: 'My App',
    meta: [
        { name: 'description', content: 'My amazing site.' }
    ],
    bodyAttrs: {
        class: 'test'
    },
    script: [{ innerHTML: 'console.log(\'Hello world\')' }]
})


const options = [
    { value: 'Frau', text: "Frau" },
    { value: 'Herr', text: "Herr" }
]

const form = ref({
    veranstaltung: ref(''),
    anrede: ref(''),
    name: ref(''),
})

</script>

<template>
    <div>
        <h1>Formular wird berechtiger Person angezeigt</h1>
        <nuxt-link to="/login">Login</nuxt-link>

        <div class="center-form">
            <input type="radio" id="one" value="Veranstaltung 111" v-model="form.veranstaltung" required />
            <label for="one">Veranstaltung 1</label>
            <input type="radio" id="two" value="Veranstaltung 222" v-model="form.veranstaltung" />
            <label for="two">Veranstaltung 2</label>
            <br><br>
            <select v-model="form.anrede">
                <option disabled value="">Anrede wählen</option>
                <option v-for="option in options" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
            <br><br>
            <input v-model="form.name" placeholder="name" />
            <br>
            <!--<br>
            <span>Veranstaltung: {{ form.veranstaltung }}</span>
            <br>
            <span>Anrede: {{ form.anrede }}</span>
            <br>
            <span>Name: {{ form.name }}</span>-->
            <br>
            <myJson :data="form" :showIcon="true" />

        </div>

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
</style>