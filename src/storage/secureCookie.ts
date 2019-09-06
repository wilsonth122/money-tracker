import Cookies, { CookieSetOptions } from "universal-cookie";

const TOKEN: string = 'token';
const USERNAME: string = 'username';
const COOKIE_SETTINGS: CookieSetOptions = { sameSite: "strict" }
const COOKIES: Cookies = new Cookies();

export function setTokenCookie(token: string) {
    COOKIES.set(TOKEN, token, COOKIE_SETTINGS);
}

export function getTokenCookie() {
    return COOKIES.get(TOKEN);
}

export function setUsernameCookie(username: string) {
    COOKIES.set(USERNAME, username, COOKIE_SETTINGS);
}

export function getUsernameCookie() {
    return COOKIES.get(USERNAME);
}

export function clearCookies() {
    COOKIES.remove(TOKEN)
    COOKIES.remove(USERNAME)
}