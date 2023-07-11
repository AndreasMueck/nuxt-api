<script setup>

// function meinGruss() {
//     world.value = 'Hallo Mars'
// }

const accessToken = useState('accessToken');
const world = ref('Hallo Welt')

//const myTimeout = setTimeout(meinGruss, 2000);


</script>

<template>
    <div>
        <h1>TEST Seite</h1>
        <nuxt-link to="/login">Loginseite</nuxt-link><br>
        <nuxt-link to="/">Formularseite (index.vue)</nuxt-link>
        <div class="a">Dieser Text enthält a Selektor </div>
        <h4>{{ accessToken }}</h4>
        <AppCamera name="Sony A7RIV" img="/images/sony.jpg" :hello-world="world" /> <!-- name/img sind props im child -->
    </div>
    <h1>Grösse ändert sich je nach Screen und von jpg -> png</h1>
    <nuxt-img sizes="sm:100px md:200px lg:300px xl:350px" preset="avatar" src="/images/sony.jpg" />
    <!-- <nuxt-img sizes="sm:100px md:200px lg:300px" preset="avatar" src="/images/sony.jpg" /> -->
    <div class="back1">
        <h1>quality: 1, format: webp</h1>
        <nuxt-picture format="webp" src="/images/sony.jpg" />
    </div>
</template>

<style scoped>
/* :deep(selector) - wird trotz style scoped auch auf die child components vererbt, hier z.B. die <Camera ></Camera> Komponente */
:deep(.a) {
    color: blue;
}

.back1 {
    background-color: lightgrey;
}

.responsive {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    height: auto;
    border-radius: 10%;
}
</style>