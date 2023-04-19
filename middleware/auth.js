export default defineNuxtRouteMiddleware((to, from) => {
    //const isAuthenticated = useState('authenticated');
    const isAuthenticated = useAuthentication()

    if (!isAuthenticated) {
      return navigateTo('/login');
    }
  });