import api from '../api';
import {
    GET_ALL_PROVINCES,
    GET_ALL_DISTRICTS,
    GET_ALL_COMMUNES,
} from './types'

export const getAllProvinces = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get('/provinces')
            .then(response => {
                dispatch({type: GET_ALL_PROVINCES, payload: response.data});
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const getAllDistricts = (province_id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get(`/districts/${province_id}`)
        .then(response => {
            dispatch({type: GET_ALL_DISTRICTS, payload: response.data});
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const getAllCommunes = (district_id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get(`/communes/${district_id}`)
            .then(response => {
                dispatch({type: GET_ALL_COMMUNES, payload: response.data});
                resolve(response.data);
            })
            .catch(err => {
                reject(err);

            })

    })
}