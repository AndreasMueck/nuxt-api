export const useAuthentication = () => { // named export
    const authenticactedState = useState('authenticated'); 

    const isAuthenticated = authenticactedState.value ? true : false; 
    return isAuthenticated;

    // if (authenticactedState.value === true){
    //     return true
    // }
    // else {
    //     return false
    // }
}