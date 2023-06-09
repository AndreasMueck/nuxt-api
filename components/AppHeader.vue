<template>
    <div class="head">
        <p>HEADER</p>
        <nuxt-link to="/datenschutz">Datenschutz</nuxt-link><br />
        <nuxt-link to="/impressum">Impressum</nuxt-link><br />
        <nuxt-link to="/">Formularseite (index.vue)</nuxt-link><br />
        <nuxt-link to="/test">Testseite</nuxt-link><br />
    </div>
</template>

<style>
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /*height: 100px; */
    background-color: green;
    color: white;
}
</style>