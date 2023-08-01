export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useAuthentication() // hole Status aus Composable

    // Hier auch die Route-Parameter Abfrage für die eingeladenen Gäste
    // .... 

    // Ist User authentifiziert?
    if (!isAuthenticated) {
      return navigateTo('/login');
    }

  });