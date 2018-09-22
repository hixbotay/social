import api from '../api';
import {
    GET_COUPLE_RESULTS,
    GET_COUPLE_DETAIL
} from './types';

export const getCoupleResults = (keyword) => (dispatch) => {
    api.get(`/couple/search/${keyword}`)
    .then(response => {
        console.log(response.data);
        dispatch({type: GET_COUPLE_RESULTS, payload: response.data});
    })
    .catch(error => {
        console.log(error);
    })
}

export const getCoupleDetail = (id) => (dispatch) => {
    api.get(`/couple/view/${id}`)
    .then(response => {
        console.log(response.data);
        dispatch({type: GET_COUPLE_DETAIL, payload: response.data});
    })
    .catch(error => {
        console.log(error);
    })
}