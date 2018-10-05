import api from '../api';
import {
    GET_ALL_EVENTS
} from './types';

export const getAllEvents = () => dispatch => {
    return api.get('/events')
        .then((response) => {
            dispatch({type: GET_ALL_EVENTS, payload: response.data.data})
        })
        .catch(err => {
            console.log(err);
        })
}