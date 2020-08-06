
import {
    LOGIN_PROCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_PROCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,


    GET_PROFILE_PROCESS,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    
    LOGOUT_PROCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from "./types";


export const doLogin = (user) => ({
    type: LOGIN_PROCESS,
    payload: user
});

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})
export const loginFail = (message) => ({
    type: LOGIN_FAIL,
    payload: message
})


export const doRegister = (user) => ({
    type: REGISTER_PROCESS,
    payload: user
});

export const RegisterSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data
})
export const RegisterFail = (message) => ({
    type: REGISTER_FAIL,
    payload: message
})



export const getProfile = (user) => ({
    type: GET_PROFILE_PROCESS,
    payload: user
});

export const getProfileSuccess = (data) => ({
    type: GET_PROFILE_SUCCESS,
    payload: data
})
export const getProfileFail = (message) => ({
    type: GET_PROFILE_FAIL,
    payload: message
})

export const logout = (user) => ({
    type: LOGOUT_PROCESS,
    payload: user
});

export const logoutSuccess = (data) => ({
    type: LOGOUT_SUCCESS,
    payload: data
})
export const logoutFail = (message) => ({
    type: LOGOUT_FAIL,
    payload: message
})

