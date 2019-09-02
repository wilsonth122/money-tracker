import { User } from "./types";
import { loginUser, createUser, deleteUser } from "./api";
import { appState } from "../appState";
import { deleteUserDetails, storeUserDetails } from "../../utils/cookieUtils";

export const actions = (update: any) => ({
  loginUser: (user: User) => update((state: any) => {
    loginUser(
      user, 
      appState.actions(update).loginSuccessful, 
      appState.actions(update).loginFailed
    );

    return {
      ...state,
      user: {...user},
      loggingIn: true
    }
  }),

  createUser: (user: User) => update((state: any) => {
    createUser(
      user, 
      appState.actions(update).loginSuccessful, 
      appState.actions(update).loginFailed
    );

    return {
      ...state,
      user: {...user},
      loggingIn: true
    }
  }),

  deleteUser: () => update((state: any) => {
    deleteUser(
      appState.actions(update).logoutUser, 
      appState.actions(update).deleteFailed
    )

    return {
      ...state,
      deleteError: false,
      deleteMessage: "",
      deletingUser: true
    }
  }),

  loginSuccessful: (data: any) => update((state: any) => {
    storeUserDetails(data);

    return {
      ...state,
      loginError: "",
      isAuthenticated: true,
      loggingIn: false
    }
  }),

  loginFailed: (error: any) => update((state: any) => {
    deleteUserDetails();

    let message = "Unable to contact server, please try again"
    if(error && error.response && error.response.data) {
      message = error.response.data.error
    }

    return {
      ...state,
      loginError: message,
      loggingIn: false
    }
  }),

  deleteFailed: (error: any) => update((state: any) => {
    let message = "Unable to contact server, please try again"
    if(error && error.response && error.response.data) {
      message = error.response.data.error
    }
    
    return {
      ...state,
      deleteError: true,
      deleteMessage: message,
      deletingUser: false
    }
  }),

  logoutUser: () => update((state: any) => {
    deleteUserDetails();

    return {
      ...state,
      user: {},
      isAuthenticated: false,
      deleteError: false,
      deleteMessage: "",
      deletingUser: false
    }
  })
})
