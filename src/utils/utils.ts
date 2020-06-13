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

export const handleResponse = async (response: any, onError?: () => void) => {
    const res = await response;
    const text = await res.text()

    const data = text && JSON.parse(text);
    if (!res.ok) {
        if (res.status === 401 && onError) {
            onError();
        }

        const error = (data && data.message) || res.statusText;
        throw new Error(error);
    }

    return data;
}