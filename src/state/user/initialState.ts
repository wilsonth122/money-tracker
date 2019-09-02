import { User } from "./types";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const initialState = () => ({
    user: {
        email: cookies.get('user') || "",
        password: ""
    } as User,
    loginError: "",
    deleteError: false,
    deleteMessage: "",
    isAuthenticated: cookies.get('token') ? true : false
})