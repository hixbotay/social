import api from '../api';
import {
    GET_ALL_PROVINCE, GET_ALL_DISTRICT
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