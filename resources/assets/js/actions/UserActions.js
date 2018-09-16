import api from '../api';
import {
    GET_USER_DETAIL,
    UPDATE_USER_DETAIL
} from './types';
import qs from 'qs';

export const getUserDetail = (id) => (dispatch) => {
    api.get(`/user/${id}`)
    .then(response => {
        console.log(response.data);
        dispatch({type: GET_USER_DETAIL, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}

export const updateUser = (data, id) => (dispatch) => {
    api.post(`/user/${id}`, {data: qs.stringify(data)})
    .then(response => {
        console.log(response.data);
        dispatch({type: UPDATE_USER_DETAIL, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}