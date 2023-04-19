<script setup>
definePageMeta({
    middleware: 'auth'
})

//await navigateTo('/test')
</script>

<template>
    <div>
        <h1>Formular</h1>
        <nuxt-link to="/login">Login</nuxt-link>
        <h2>Hier sind ganz viele Formularfelder</h2>
    </div>
</template>