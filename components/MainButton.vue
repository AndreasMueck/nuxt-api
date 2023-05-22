<template>
    <div>
        <button :class="childclass">
            <slot>Default</slot>
        </button>
    </div>
</template>

<script setup>
const props = defineProps(['childclass'])
</script>

<style>
.button {
    padding: 14px 28px;
    font-size: 16px;
    cursor: pointer;
}

.rot {
    color: white;
    background-color: red;
    border-color: red;
}

.blau {
    color: white;
    background-color: blue;
    border-color: blue;
}

.grau {
    color: black;
    background-color: lightgray;
    border-color: lightgray;
}
</style>