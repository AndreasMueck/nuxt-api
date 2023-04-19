export const useAuthentication = () => { // named export
    const authenticacted = useState('authenticated'); 

    if (authenticacted.value === true){
        return true
    }
    else {
        return false
    }
}