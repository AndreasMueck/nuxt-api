<script setup>
definePageMeta({
    middleware: 'auth' // Zugriff auf Seite index.vue nur als berechtigter User
})
</script>

<template>
    <div>
        <h1>Formular wird berechtiger Person angezeigt</h1>
        <nuxt-link to="/login">Login</nuxt-link>
        <h2>Hier sind ganz viele Formularfelder</h2>
    </div>
</template>