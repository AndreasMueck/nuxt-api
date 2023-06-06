<template>
    <div class="camera">
        <h2 class="camera__name">{{ name }}</h2>
        <img class="camera__image" v-bind:src="img" />
    </div>
    <div class="a">Dieser Text steht in der Camera Komponente und verwendet vererbte style sheets</div>
    <!-- Der Style kommt aus dem Parent mittels :deep(selector), trotz style scoped -->
</template>

<script setup>
const props = defineProps(['name', 'img'])
//console.log(props.img)
</script>