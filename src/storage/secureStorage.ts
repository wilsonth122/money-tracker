import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';

const STORE_NAME: string = 'money_tracker';
const TOKEN: string = 'token';
const USERNAME: string = 'username';

let _storage: SecureStorageObject;

export function storeToken(token: string) {
    if(!_storage) {
        initialiseSecureStorage();
    }

    _storage.set(TOKEN, token)
        .then(
            data => console.log(data),
            error => console.log(error)
        );
}

export function getStoredToken() {
    let token: string = 'UNDEFINED';

    if(_storage) {
        _storage.get(TOKEN).then(
            data => token = data,
            error => console.log(error)
        );
    }

    return token;
}

export function storeUsername(username: string) {
    if(!_storage) {
        initialiseSecureStorage();
    }

    _storage.set(USERNAME, username)
        .then(
            data => console.log(data),
            error => console.log(error)
        );
}

export function getStoredUsername() {
    let token: string = 'UNDEFINED';

    if(_storage) {
        _storage.get(USERNAME).then(
            data => token = data,
            error => console.log(error)
        );
    }

    return token;
}

export function clearStorage() {
    _storage.clear().then(
        data => console.log(data),
        error => console.log(error)
    );
}

function initialiseSecureStorage() {
    new SecureStorage().create(STORE_NAME).then((storage: SecureStorageObject) => {
        _storage = storage;
    })
}
