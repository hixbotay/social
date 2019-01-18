import api from '../api';
import {
    GET_ALL_EVENTS, 
    GET_FORTHCOMING_EVENTS,
    GET_FINISHED_EVENTS,
    GET_CANCELLED_EVENTS,
    GET_AROUND_EVENTS,
    GET_EVENTS_HAS_YOUR_CRUSH,
    GET_INVITED_EVENTS,
    GET_UPCOMING_EVENTS,
    CREATE_GROUP_EVENT,
    CREATE_COUPLE_EVENT,
    JOIN_EVENT,
    GET_EVENT_DETAIL,
    INVITE_INTO_EVENT,
    SEARCH_EVENTS,
    UPDATE_EVENT_STATUS,
    SUBSCRIBE_EVENT,
    GET_SUBSCRIBERS,
    REVIEW_DATING,
    GET_MY_SUBSCRIBERS,
    DELETE_SUBSCRIBER
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
                case 'upcoming': {
                    type = GET_UPCOMING_EVENTS;
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

export const createGroupEvent = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/event/group', data)
        .then((response) => {
            dispatch({type: CREATE_GROUP_EVENT, payload: response.data});
            resolve(response.data);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

export const createCoupleEvent = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/event/couple', data)
        .then((response) => {
            dispatch({type: CREATE_COUPLE_EVENT, payload: response.data});
            resolve(response.data);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
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
    return new Promise((resolve, reject) => {
        api.get(`/event/${id}`)
        .then(response => {
            dispatch({type: GET_EVENT_DETAIL, payload: response.data});
            resolve(response.data.creator_user);
        })
        .catch(err => {
            console.log(err);
            reject(error);
        })
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

export const updateEventStatus = (event_id, status) => (dispatch) => {
    return api.post(`/event/status/${event_id}`, status)
        .then(response => {
            dispatch({type: UPDATE_EVENT_STATUS, payload: response.data});
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
}

export const subscribeEvent = (data) => (dispatch) => {
    return api.post('/event/subscribe', data)
        .then(response => {
            dispatch({type: SUBSCRIBE_EVENT, payload: response.data});
            window.alert('Bạn đã đăng ký thành công');
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            window.alert("Đã có lỗi xảy ra. Vui lòng thử lại");
        })
}

export const listSubscribers = (page = 1) => dispatch => {
    return api.get(`/subscribers?page=${page}`).then(res => {
        dispatch({type: GET_SUBSCRIBERS, payload: res.data.data});
    }).catch(err => {
        console.log(err);
    })
}

export const reviewDating = (data, event_id) => dispatch => {
    return api.post(`/event/review/${event_id}`, data).then(response => {
        dispatch({type: REVIEW_DATING, payload: response.data});
        window.location.reload();
    }).catch(err => {
        console.log(err);
    })
}

export const getMySubscribers = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/my-subscribers').then(response => {
            dispatch({type: GET_MY_SUBSCRIBERS, payload: response.data.subscribers});
            resolve(response.data.subscribers.length);
        }).catch(err => {
            reject(err);
        })
    })
}

export const deleteSubscriber = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/subscribers/${id}`).then(response => {
            dispatch({type: DELETE_SUBSCRIBER, payload: id});
            resolve(response.data);
        }).catch(err => {
            reject(err);
        })
    })
}