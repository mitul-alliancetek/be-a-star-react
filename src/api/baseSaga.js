import Axios from "axios";

import  config from './../config';

export const postWithoutHeader = async ( url , data ) => {
    return await Axios.post( config.apiPath + url , data)
    .then(response => {
        return response.data;
    }).catch(error => {
        if(error.response.status == 401){
            window.location.href = "/login";
        }
        return error
    })
}

export const postWithHeader = async ( url , data ) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    return await Axios.post( config.apiPath + url , data, {
        headers:headers
    })
    .then(response => {
        return response.data;
    }).catch(error => {
        if(error.response.status == 401){
            window.location.href = "/login";
        }
        return error
    })
}

export const getWithHeader = async ( url  ) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    return await Axios.get( config.apiPath + url , {
        headers:headers
    })
    .then(response => {
        return response.data;
    }).catch(error => {
        // if(error.response.status == 401){
        //     window.location.href = "/login";
        // }
        return error
    })
}