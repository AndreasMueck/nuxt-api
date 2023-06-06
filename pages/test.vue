<script setup>
const accessToken = useState('accessToken');
</script>

<template>
    <div>
        <h1>TEST Seite</h1>
        <nuxt-link to="/login">Loginseite</nuxt-link><br>
        <nuxt-link to="/">Formularseite (index.vue)</nuxt-link>
        <div class="a">Dieser Text enthält a Selektor </div>
        <h4>{{ accessToken }}</h4>
        <!--<Camera name="Sony A7RIV" img="/images/sony.jpg" /> name/img sind props im child -->
    </div>
    <nuxt-img sizes="sm:100px md:200px lg:300px" src="/images/sony.jpg" />
    <!-- <nuxt-img sizes="sm:100px md:200px lg:300px" preset="avatar" src="/images/sony.jpg" /> -->
    <div class="back1">
        <nuxt-img format="webp" class="responsive" src="/images/sony.jpg" />
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
    border-radius: 50%;
}
</style>