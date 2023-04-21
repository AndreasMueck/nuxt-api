<script setup>
definePageMeta({
    middleware: 'auth' // Zugriff auf Seite index.vue nur als berechtigter User
})

const options = [
    { value: 'Frau', text: "Frau" },
    { value: 'Herr', text: "Herr" }
]

const form = ref({
    picked: ref(''),
    selected: ref(''),
    name: ref(''),
})

</script>

<template>
    <div>
        <h1>Formular wird berechtiger Person angezeigt</h1>
        <nuxt-link to="/login">Login</nuxt-link>

        <div class="center-form">
            <input type="radio" id="one" value="Veranstaltung1" v-model="form.picked" required />
            <label for="one">Veranstaltung 1</label>
            <input type="radio" id="two" value="Veranstaltung2" v-model="form.picked" />
            <label for="two">Veranstaltung 2</label>
            <br><br>
            <select v-model="form.selected">
                <option disabled value="">Anrede wählen</option>
                <option v-for="option in options" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
            <br><br>
            <input v-model="form.name" placeholder="name" />
            <br>
            <br>
            <span>Veranstaltung: {{ form.picked }}</span>
            <br>
            <span>Anrede: {{ form.selected }}</span>
            <br>
            <span>Name: {{ form.name }}</span>
            <br>
            <span>{{ form }}</span>
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