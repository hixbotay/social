import api from '../api';
import {
    GET_ALL_PROVINCES,
    GET_ALL_DISTRICTS,
    GET_ALL_COMMUNES,
} from './types'

export const getAllProvinces = () => (dispatch) => {
    api.get('/provinces')
        .then(response => {
            dispatch({type: GET_ALL_PROVINCES, payload: response.data});
        })
        .catch(err => {
            console.log(err);
        })
}

export const getAllDistricts = (province_id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get(`/districts/${province_id}`)
        .then(response => {
            resolve(response.data);
            dispatch({type: GET_ALL_DISTRICTS, payload: response.data});
        })
        .catch(err => {
            reject(err);
            console.log(err);
        })
    })
}

export const getAllCommunes = (district_id) => (dispatch) => {
    api.get(`/communes/${district_id}`)
        .then(response => {
            dispatch({type: GET_ALL_COMMUNES, payload: response.data});
        })
        .catch(err => {
            console.log(err);
        })
}