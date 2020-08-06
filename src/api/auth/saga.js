import  { apiPath } from './../../config';
import { all, call, fork, put , takeEvery } from "redux-saga/effects";

import {
    LOGIN_PROCESS,
    REGISTER_PROCESS,
    GET_PROFILE_PROCESS,
    LOGOUT_PROCESS
   
} from "./types";

import { loginSuccess, 
    loginFail,
    RegisterSuccess,
    RegisterFail,
    getProfileFail,
    getProfileSuccess,
    logoutSuccess, 
    logoutFail,

} from './actions';

import { postWithoutHeader, postWithHeader, getWithHeader } from './../baseSaga';


/* Register */
function* registerFunction(data){
    try{
        const response = yield call(postWithoutHeader,  "rest-auth/registration/",  data.payload );
        if(response.response){
            yield put(RegisterFail(response.response.data));
        }else{
            yield put(RegisterSuccess(response));
        }
    } catch (error) {
        yield put(RegisterFail("Please try again!!"));
    }
}
export function* watchUserRegister(){
    yield takeEvery(REGISTER_PROCESS, registerFunction)
}

 
/* Logn */
function* loginFunction(data){
    try{
        const response = yield call(postWithoutHeader,  "rest-auth/login/",  data.payload );
        if(response.response){
            yield put(loginFail(response.response.data));
        }else{
            localStorage.setItem('token', response.key);
            yield put(loginSuccess(response.key));
        }
    } catch (error) {
        yield put(loginFail("Please try again!!"));
    }
}
export function* watchUserLogin(){
    yield takeEvery(LOGIN_PROCESS, loginFunction)
}



/* Get Profile */
function* profileFunction(data){
    try{
        const response = yield call(getWithHeader,  "users/",  data.payload );
        if(response.response){
            yield put(getProfileFail(response.response.data));
        }else{
            yield put(getProfileSuccess(response[0]));
        }
    } catch (error) {
        yield put(getProfileFail("Please try again!!"));
    }
}
export function* watchGetProfile(){
    yield takeEvery(GET_PROFILE_PROCESS, profileFunction)
}



/* Logout */
function* logoutFunction(data){
    try{
        const response = yield call(postWithHeader,  "rest-auth/logout/",  data.payload );
        localStorage.removeItem('token');
        yield put(logoutSuccess({}));
    } catch (error) {
        yield put(logoutFail("Please try again!!"));
    }
}
export function* watchLogout(){
    yield takeEvery(LOGOUT_PROCESS, logoutFunction)
}
export default function* rootSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserRegister),
        fork(watchGetProfile),
        fork(watchLogout),
    ])
}