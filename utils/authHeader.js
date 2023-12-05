export function authHeader() {
    // return authorization header mit token

    const authenticactedState = useState('authenticated');
    const accessToken = useState('accessToken');

    if (authenticactedState && accessToken) {
        return { 'Authorization': 'Bearer ' + accessToken.value };
    } else {
        return {};
    }
}