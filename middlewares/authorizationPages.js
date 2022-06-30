import Cookies from "next-cookies";

export function unauthPage(context) {
    return new Promise(resolve => {
        const cookie = Cookies(context);

        if (cookie.token) return context.res.writeHead(302, {
            Location: '/posts'
        }).end();

        return resolve('unauthorized');
    });
}
export function authPage(context) {
    return new Promise(resolve => {
        const cookie = Cookies(context);

        if (!cookie.token) return context.res.writeHead(302, {
            Location: '/auth/login'
        }).end();

        return resolve({
            token: cookie.token
        });
    });
}