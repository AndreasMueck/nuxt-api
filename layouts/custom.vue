<template>
    <div>
        Kein Header und kein Footer --> custom Layout (/layouts/custom.vue)
        <slot />
    </div>
</template>

<style>
html,
body {
    padding: 0;
    margin: 0;
    height: 100%;
}
</style>


