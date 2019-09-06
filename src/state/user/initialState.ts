import { User } from "./types";
import { getUsername, getToken } from "../../storage/storageUtils";

export const initialState = () => ({
    user: {
        email: getUsername() || "",
        password: ""
    } as User,
    loginError: "",
    deleteError: false,
    deleteMessage: "",
    isAuthenticated: getToken() ? true : false
})