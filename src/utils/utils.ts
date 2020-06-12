export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': user.token };
    } else {
        return {};
    }
}