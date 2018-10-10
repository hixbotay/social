import api from '../api';
import {
    GET_CURRENT_USER,
    GET_USER_DETAIL,
    UPDATE_USER_DETAIL,
    GET_CURRENT_USER_DETAIL,
    UPDATE_RELATIONSHIP,
    GET_FRIENDS_YOU_LIKED,
    GET_FRIENDS_LIKED_YOU
} from './types';

export const getCurrentUser = () => (dispatch) => {
    api.get('auth/user')
    .then(response => {
        dispatch({type: GET_CURRENT_USER, payload: response.data});
    })
    .catch(error => {
        console.log(error);
    })
}

export const getOtherUserDetail = (id) => (dispatch) => {
    api.get(`/user/${id}`)
    .then(response => {
        dispatch({type: GET_USER_DETAIL, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}

export const getCurrentUserDetail = () => (dispatch) => {
    api.get('/user')
    .then(response => {
        dispatch({type: GET_CURRENT_USER_DETAIL, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}

export const updateUser = (data, id) => (dispatch) => {
    console.log(data);
    api.post(`/user/${id}`, data)
    .then(response => {
        window.location.reload();
        dispatch({type: UPDATE_USER_DETAIL, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}

export const updateRelationship = (data, user_id) => (dispatch) => {
    api.post(`/relationship/${user_id}`, data)
    .then(response => {
        dispatch({type: UPDATE_RELATIONSHIP, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}

//this function run in background

export const addVisitor = (data) => (dispatch) => {
    api.post(`/profile/visitprofile`, data)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    return Promise.resolve();
}

export const getListFriends = (type) => (dispatch) => {
    api.get(`/friends/${type}`)
    .then(response => {
        console.log(response.data);
        if(type == 'you-like') {
            dispatch({type: GET_FRIENDS_YOU_LIKED, payload: response.data});
        } else if(type == 'like-you') {
            dispatch({type: GET_FRIENDS_LIKED_YOU, payload: response.data});
        }
    })
    .catch(err => {
        console.log(err);
    })
}

