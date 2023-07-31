<script setup>
const title = ref('Hello World')
const title1 = ref('Hello Mars')
</script>

<template>
    <div>
        <slot name="content" :title="title" :title1="title1" />
    </div>
</template>


<style></style>