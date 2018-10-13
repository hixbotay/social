import api from '../api';
import {
    GET_ALL_EVENTS, 
    CREATE_NEW_EVENT,
    JOIN_EVENT
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

export const createNewEvent = (data) => dispatch => {
    console.log(data);
    return api.post('/event', data)
    .then((response) => {
        dispatch({type: CREATE_NEW_EVENT, payload: response.data});
        // window.location.reload();
    })
    .catch(err => {
        console.log(err);
    })
}

export const joinDating = (id) => dispatch => {
    api.post(`/event/${id}`)
    .then(response => {
        console.log(response);
        dispatch({type: JOIN_EVENT, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}