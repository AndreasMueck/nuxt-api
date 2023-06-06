<template>
  <nuxt-link to="/">Index</nuxt-link><br />
  <main>
    <ContentDoc />
  </main>
</template>

<style scoped>
:deep(p) {
  /* :deep(selector) ist notwendig, um den Text aus dem markdown zu stylen */
  color: green;
}

:deep(li) {
  /* :deep(selector) ist notwendig, um den Text aus dem markdown zu stylen */
  color: blue;

}


:deep(td) {
  width: 100px;
}

:deep(th) {
  text-align: left;
}
</style>