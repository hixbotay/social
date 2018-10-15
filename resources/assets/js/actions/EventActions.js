import api from '../api';
import {
    GET_ALL_EVENTS, 
    GET_FORTHCOMING_EVENTS,
    GET_FINISHED_EVENTS,
    GET_CANCELLED_EVENTS,
    CREATE_NEW_EVENT,
    JOIN_EVENT
} from './types';

export const getAllEvents = (status) => dispatch => {
    return api.get(`/events/${status}`)
        .then((response) => {
            var type = GET_ALL_EVENTS;
            switch(status) {
                case 'forthcoming': {
                    type = GET_FORTHCOMING_EVENTS;
                    break;
                }
                case 'finished': {
                    type = GET_FINISHED_EVENTS;
                    break;
                }
                case 'cancelled': {
                    type = GET_CANCELLED_EVENTS;
                    break;
                }
                default: break;
            }
            dispatch({type: type, payload: response.data.data})
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