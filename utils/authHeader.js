export function authHeader() {
    // return authorization header mit token

    const authenticactedState = useState('authenticated');
    const accessToken = useState('access-token');

    if (authenticactedState && accessToken) {
        return { 'Authorization': 'Bearer ' + accessToken };
    } else {
        return {};
    }
}