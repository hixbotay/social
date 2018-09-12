import api from '../api';
import {
    GET_USER_DETAIL
} from './types';

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