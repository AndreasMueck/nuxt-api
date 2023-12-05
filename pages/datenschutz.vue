<script setup>
definePageMeta({
  title: 'Some Page'
})
</script>

<template>
  <nuxt-link to="/">Index</nuxt-link><br />
  <main>
    <ContentDoc />
  </main>
</template>

<style scoped>
:deep(.note) {
  background-color: lightblue;
}

:deep(p) {
  /* :deep(selector) ist notwendig, um den Text aus dem markdown zu stylen */
  color: green;
}

:deep(ul:first-of-type) {
  /* :deep(selector) ist notwendig, um den Text aus dem markdown zu stylen */
  color: blue;
  text-transform: uppercase;
}

:deep(td) {
  width: 100px;
}

:deep(th) {
  text-align: left;
}
</style>