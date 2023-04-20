export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useAuthentication() // hole Status aus Composable

    if (!isAuthenticated) {
      return navigateTo('/login');
    }
  });