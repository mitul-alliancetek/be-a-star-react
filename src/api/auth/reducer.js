import {
    LOGIN_PROCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,


    REGISTER_SUCCESS,
    REGISTER_PROCESS,
    REGISTER_FAIL,

    GET_PROFILE_PROCESS,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,

    LOGOUT_PROCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,

} from "./types";


const INIT_STATE = {
    token: "",
    user: {},

    loading: false,
    loginErrorMessage: {},
    loginSuccess: false,
    loginFail: false,

    registerInProcess: false,
    registerInSucess: false,
    registerInFail: false,
    registerErrorMessage: [],
    registerUserInfo: {},

    isLoggedIn: false,
    profileLoading: false,
    profileLoadingSuccess: false,
    userProfile: {},

    isLoggedOutProcess: false,


}


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_PROCESS:
            return {
                ...state, loading: true,
                loginSuccess: false,
                loginFail: false,
                loginErrorMessage: {}
            }
        case LOGIN_SUCCESS:
            return {
                ...state, loading: false,
                loginSuccess: true,
                loginFail: false,
                loginErrorMessage: {},
                user: {},
                token: action.payload
            }
        case LOGIN_FAIL:
            return {
                ...state, loading: false,
                loginSuccess: false,
                loginFail: true,
                loginErrorMessage: action.payload,
                token: "",
                user: {}
            }

        case REGISTER_PROCESS:
            return {
                ...state,
                registerInProcess: true,
                registerInSucess: false,
                registerInFail: false,
                registerUserInfo: {},
                registerErrorMessage: []
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerInProcess: false,
                registerInSucess: true,
                registerUserInfo: action.payload,
                registerInFail: false,
            }
        case REGISTER_FAIL:
            return {
                ...state,
                registerInProcess: false,
                registerInSucess: false,
                registerInFail: true,
                registerUserInfo: {},
                registerErrorMessage: action.payload
            }

        case GET_PROFILE_PROCESS:
            return {
                ...state,
                profileLoading: true,
                profileLoadingSuccess: false,
                userProfile: {}
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profileLoading: false,
                profileLoadingSuccess: true,
                userProfile: action.payload,
                isLoggedIn: true,
            }
        case GET_PROFILE_FAIL:
            return {
                ...state,
                profileLoading: false,
                profileLoadingSuccess: false,
                userProfile: {},
            }

        case LOGOUT_PROCESS:
            return {
                ...state,
                isLoggedOutProcess: false,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedOutProcess: false,
                isLoggedIn: false,
                userProfile: {},
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                isLoggedOutProcess: false,
            }

        default:
            return { ...state };
    }
}


