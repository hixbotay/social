import api from '../api';
import {
    GET_ALL_EVENTS, 
    GET_FORTHCOMING_EVENTS,
    GET_FINISHED_EVENTS,
    GET_CANCELLED_EVENTS,
    GET_AROUND_EVENTS,
    GET_EVENTS_HAS_YOUR_CRUSH,
    CREATE_NEW_EVENT,
    JOIN_EVENT,
    GET_EVENT_DETAIL
} from './types';

export const getAllEvents = (type) => dispatch => {
    return api.get(`/events/${type}`)
        .then((response) => {
            // var type = GET_ALL_EVENTS;
            switch(type) {
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
                case 'around': {
                    type = GET_AROUND_EVENTS;
                    break;
                }
                case 'crush': {
                    type = GET_EVENTS_HAS_YOUR_CRUSH;
                    break;
                }
                default: {
                    type = GET_ALL_EVENTS;
                    break;
                }
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

export const getEventDetail = (id) => dispatch => {
    api.get(`/event/${id}`)
    .then(response => {
        dispatch({type: GET_EVENT_DETAIL, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}