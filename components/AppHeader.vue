<template>
    <div class="head">
        <p>HEADER</p>
        <nuxt-link to="/">Formularseite (index.vue)</nuxt-link>
        <nuxt-link to="/test">Testseite</nuxt-link>
        <nuxt-link to="/datenschutz">Datenschutz</nuxt-link>
        <nuxt-link to="/impressum">Impressum</nuxt-link>
    </div>
</template>

<style>
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    background-color: lightgreen;
    color: white;
}
</style>