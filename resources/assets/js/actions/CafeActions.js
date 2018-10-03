import api from '../api';
import {
    GET_ALL_PROVINCE,
    GET_ALL_DISTRICT,
    GET_CAFE_DETAIL,
    GET_ALL_COMMUNE,
    GET_ALL_CAFE, CREATE_NEW_POST
} from './types'

export const getAllProvince = () => (dispatch) => {
    api.get('/getAllProvince')
        .then(response => {
            dispatch({type: GET_ALL_PROVINCE, payload: response.data});
        })
        .catch(err => {
            console.log(err);
        })
}

export const getAllDistrict = () => (dispatch) => {
    api.get('/getAllDistrict')
        .then(response => {
            dispatch({type: GET_ALL_DISTRICT, payload: response.data});
        })
        .catch(err => {
            console.log(err);
        })
}

export const getAllCommune = () => (dispatch) => {
    api.get('/getAllCommune')
        .then(response => {
            dispatch({type: GET_ALL_COMMUNE, payload: response.data});
        })
        .catch(err => {
            console.log(err);
        })
}


export function getAllCafe(index = 0) {
    api.get('/getListCafe/'+index)
        .then(response => {
            dispatch({type: GET_ALL_CAFE, payload: response.data});
        })
        .catch(err => {
            console.log(err);
        })
}

export function getCafeDetail(id) {
    api.get('/getCafeDetail/'+id)
        .then(response => {
            dispatch({type: GET_CAFE_DETAIL, payload: response.data});
        })
        .catch(err => {
            console.log(err);
        })
}

export const createCafe = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.post('/cafe/create', data)
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                }else{
                    resolve({status: 'ko', message: 'Unknown error'});
                }
            })
            .catch(error => {
                console.log(error);
                reject(error);
            })
    })
}

export const listCafe = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.post('/cafe/list/1', data)
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                }else{
                    resolve({status: 'ko', message: 'Unknown error'});
                }
            })
            .catch(error => {
                reject(error);
            })
    })
}