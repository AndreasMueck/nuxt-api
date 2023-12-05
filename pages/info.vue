<script setup>
const infodata = await queryContent('/info').findOne()
console.log(infodata)
</script>

<template>
    <div>
        <h1>info.vue mit info.json</h1>
        <h2>{{ infodata.title.title1 }}</h2>
    </div>
</template>