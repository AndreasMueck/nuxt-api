<template>
    <div class="camera">
        <h2 class="camera__name">Camera Componente mit props. Hier Name: {{ name }}</h2>
        <h3 class="camera__name">{{ helloWorld }}</h3>
        <img class="camera__image" v-bind:src="img" />
    </div>
    <div class="a">Dieser Text steht in der Camera Komponente und verwendet vererbte style sheets</div>
    <!-- Der Style kommt aus dem Parent mittels :deep(selector), trotz style scoped -->
</template>

<script setup>
const props = defineProps({
    name: String,
    img: String,
    helloWorld: String,
})
//console.log(props.img)
</script>