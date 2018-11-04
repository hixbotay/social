import api from '../api';
import {
    GET_ALL_EVENTS, 
    GET_FORTHCOMING_EVENTS,
    GET_FINISHED_EVENTS,
    GET_CANCELLED_EVENTS,
    GET_AROUND_EVENTS,
    GET_EVENTS_HAS_YOUR_CRUSH,
    GET_INVITED_EVENTS,
    CREATE_NEW_EVENT,
    JOIN_EVENT,
    GET_EVENT_DETAIL,
    INVITE_INTO_EVENT,
    SEARCH_EVENTS
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
                case 'invited': {
                    type = GET_INVITED_EVENTS;
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
    return new Promise((resolve, reject) => {
        api.post(`/event/${id}`)
        .then(response => {
            console.log(response);
            dispatch({type: JOIN_EVENT, payload: response.data});
            resolve(response.data)
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
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

export const invite = (event_id, content) => dispatch => {
    console.log(content);
    api.post(`/invite/${event_id}`, content)
    .then(res => {
        // dispatch({type: INVITE_INTO_EVENT, payload: res.data});
        window.alert(res.data.message);
    })
    .catch(err => {
        console.log(err);
    })
}

export const updateInvitation = (event_id, data) => (dispatch) => {
    api.post(`/invite/${event_id}/update`, data).then(response => {
        if(data.type === 'accept') {
            window.location.href = `${baseUrl}/dating/${event_id}`;
        } else {
            window.alert("Từ chối lời mời thành công");
        }
    }).catch(err => {
        console.log(err);
        window.alert("Đã có lỗi xảy ra. Vui lòng thử lại");
    })
}

export const searchEvent = (filter_string) => (dispatch) => {
    return api.get(`/event/search?${filter_string}`)
        .then(response => {
            dispatch({type: SEARCH_EVENTS, payload: response.data.data});
        })
        .catch(err => {
            console.log(err);
        })
}