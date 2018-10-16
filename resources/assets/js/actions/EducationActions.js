import api from '../api';
import {
    GET_EDUCATION
} from './types';

export const getEducations = () => dispatch => {
    api.get('/education').then(response => {
        dispatch({type: GET_EDUCATION, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}