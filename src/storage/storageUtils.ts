import { isPlatform } from '@ionic/core';
import { getStoredToken, storeToken, storeUsername, getStoredUsername, clearStorage } from './secureStorage';
import { getTokenCookie, setTokenCookie, setUsernameCookie, getUsernameCookie, clearCookies } from './secureCookie';

export function storeUserDetails(data: any) {
    console.log("Storing user details : " + data.token)
    if(isPlatform("ios") || isPlatform("android")) {
        storeToken(data.token);
        storeUsername(data.email);
    }
    else {
        setTokenCookie(data.token);
        setUsernameCookie(data.email)
    }
}

export function deleteUserDetails() {
    if(isPlatform("ios") || isPlatform("android")) {
        clearStorage();
    }
    else {
        clearCookies();
    }
}

export function tokenHeader() {
    let token;

    if(isPlatform("ios") || isPlatform("android")) {
        token = getStoredToken();
    }
    else {
        token = getTokenCookie();
        console.log("Is not ios or android: " + token)
    }

    return { headers: {Authorization: `Bearer ${token}`} }
}

export function getToken() {
    let token;

    if(isPlatform("ios") || isPlatform("android")) {
        token = getStoredToken();
    }
    else {
        token = getTokenCookie();
    }

    return token;
}

export function getUsername() {
    let username;

    if(isPlatform("ios") || isPlatform("android")) {
        username = getStoredUsername();
    }
    else {
        username = getUsernameCookie();
    }

    return username;
}
