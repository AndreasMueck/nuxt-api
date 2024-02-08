<template>
    <div class="head">
        <p>HEADER</p>
        <nuxt-link to="/">Formularseite (index.vue)</nuxt-link>
        <nuxt-link to="/test">Testseite</nuxt-link>
        <nuxt-link to="/datenschutz">Datenschutz</nuxt-link>
        <nuxt-link to="/impressum">Impressum</nuxt-link>
        <nuxt-link to="/veelidate">Veelidate</nuxt-link>
        <nuxt-link to="/radio">Radio</nuxt-link>
        <nuxt-link to="/vee1">Vee1</nuxt-link>
    </div>
</template>

<style>
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    background-color: lightblue;
    color: white;
}
</style>