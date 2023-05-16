<script setup>
const accessToken = useState('accessToken');
</script>

<template>
    <div>
        <h1>TEST Seite</h1>
        <nuxt-link to="/login">Loginseite</nuxt-link><br>
        <nuxt-link to="/">Formularseite (index.vue)</nuxt-link>
        <h4>{{ accessToken }}</h4>
    </div>
</template>