import api from '../api';
import {
    GET_NOTIFICATIONS,
    MARK_READ,
    MARK_ALL_AS_READ,
    GET_UNREAD_NUMBER
} from './types';

export const getNotifications = (page) => dispatch => {
    api.get(`/notifications?page=${page}`).then(response => {
        dispatch({type: GET_NOTIFICATIONS, payload: response.data.data});
    }).catch(err => {
        console.log(err);
    })
}

export const markAllAsRead = () => dispatch => {
    api.post('/notifications/all').then(response => {
        dispatch({type: MARK_ALL_AS_READ});
    }).catch(err => {
        console.log(err);
    })
}

export const markRead = (id) => dispatch => {
    api.get(`/notification/${id}`).then(response => {
        dispatch({type: MARK_READ});
    }).catch(err => {
        console.log(err);
    })
}

export const getUnreadNumber = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get('/notifications/count-unread').then(response => {
            dispatch({type: GET_UNREAD_NUMBER, payload: response.data});
            resolve(response.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}