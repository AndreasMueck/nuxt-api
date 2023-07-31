<script setup>

// function meinGruss() {
//     world.value = 'Hallo Mars'
// }

const accessToken = useState('accessToken')
const world = ref('Hallo Welt')

//const myTimeout = setTimeout(meinGruss, 2000);
const sizesvar = 'sm:100px md:200px lg:300px xl:350px'

</script>

<template>
    <div>
        <h1>TEST Seite</h1>
        <nuxt-link to=" /login">Loginseite</nuxt-link><br>
        <nuxt-link to="/">Formularseite (index.vue)</nuxt-link>
        <div class="a">Dieser Text enthält a Selektor </div>
        <h4>{{ accessToken }}</h4>
        <!-- <AppCamera name="Sony A7RIV" img="/images/sony.jpg" :hello-world="world" /> name/img sind props im child -->
    </div>
    <div class="test">
        <nuxt-img :sizes="sizesvar" preset="avatar" src="/images/sony.jpg" />
    </div>
    <h1>sfasdfsad</h1>
    <!--<nuxt-img sizes="sm:100px md:200px lg:300px xl:350px" preset="avatar" src="/images/sony.jpg" />-->
    <!--<img data-src="/images/large.jpg" />-->
    <div class="back1">
        <!--<lazy-nuxt-picture loading="lazy" format="webp" src="/images/sony.jpg" />-->
        <nuxt-picture src="/images/large.jpg" width="3840" height="2160" />
    </div>
</template>

<style scoped>
.test1 {
    height: 5000px;
}

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