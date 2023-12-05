<script setup>
useHead({
  title: 'Impressum',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'test' // füge dynamisch die css Klasse dem body tag hinzu
  }
})
</script>

<template>
  <nuxt-link to="/">Index</nuxt-link>
  <main>
    <ContentDoc />
  </main>
  <div class="a">Dieser Text hat auch den selektor a ist aber nicht im ContentDoc</div>
</template>