import api from '../api';
import {
    GET_RELIGION
} from './types';

export const getReligion = () => dispatch => {
    api.get('/religion').then(response => {
        dispatch({type: GET_RELIGION, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}