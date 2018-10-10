import api from '../api';
import {
    GET_CAFE_DETAIL,
    GET_ALL_CAFE, 
    CREATE_NEW_CAFE
} from './types'

export const getAllCafe = (page = 1) => (dispatch) => {
    return api.get(`/cafes?page=${page}`)
        .then(response => {
            dispatch({type: GET_ALL_CAFE, payload: response.data.data});
        })
        .catch(err => {
            console.log(err);
        })
}

export const getCafeDetail = (id) => (dispatch) => {
    return api.get(`/cafe/${id}`)
        .then(response => {
            dispatch({type: GET_CAFE_DETAIL, payload: response.data});
        })
        .catch(err => {
            console.log(err);
        })
}

export const createCafe = (data) => (dispatch) => {
    return api.post('/cafe/create', data)
        .then(response => {
            console.log(response.data);
            dispatch({type: CREATE_NEW_CAFE, payload: response.data});
            window.location.href = `cafe/${response.data.id}/view`;
        })
        .catch(error => {
            console.log(error);
        })
}

export const listCafe = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get('/cafe/list/1', data)
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