<script setup>
const accessToken = useState('access-token');
</script>

<template>
    <div>
        <h1>TEST Seite</h1>
        <nuxt-link to="/login">Login</nuxt-link><br>
        <nuxt-link to="/">Index</nuxt-link>
        <h4>{{ accessToken }}</h4>
    </div>
</template>