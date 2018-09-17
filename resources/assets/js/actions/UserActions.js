import api from '../api';
import {
    GET_USER_DETAIL,
    UPDATE_USER_DETAIL
} from './types';

export const getUserDetail = (id) => (dispatch) => {
    api.get(`/user/${id}`)
    .then(response => {
        dispatch({type: GET_USER_DETAIL, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}

export const updateUser = (data, id) => (dispatch) => {
    console.log(data);
    api.post(`/user/${id}`, data)
    .then(response => {
        window.location.reload();
        dispatch({type: UPDATE_USER_DETAIL, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}