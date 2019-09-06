import axios from 'axios'
import { User } from './types'
import { tokenHeader } from '../../storage/storageUtils';

const userUrl: string = process.env.REACT_APP_USER_URL || "";

export function loginUser(user: User, onSuccess: Function, onError: Function) {
    axios.post(userUrl + "/login", user)
        .then((response) => {
            if(response.status >= 200 && response.status <= 300) {
                onSuccess(response.data)
            } 
            else {
                onError(response.data)
            }
        })
        .catch((error) => onError(error))
}

export function createUser(user: User, onSuccess: Function, onError: Function) {
    axios.post(userUrl + "/new", user)
        .then((response) => {
            if(response.status >= 200 && response.status <= 300) {
                onSuccess(response.data)
            } 
            else {
                onError(response.data)
            }
        })
        .catch((error) => onError(error))
}

export function deleteUser(onSuccess: Function, onError: Function) {
    let header = tokenHeader();

    axios.delete(userUrl + "/delete", header)
        .then((response) => {
            if(response.status >= 200 && response.status <= 300) {
                onSuccess(response.data)
            } 
            else {
                onError(response.data)
            }
        })
        .catch((error) => onError(error))
}