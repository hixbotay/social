import api from '../api';
import {
    GET_CURRENT_USER,
    GET_USER_DETAIL,
    UPDATE_USER_DETAIL,
    GET_CURRENT_USER_DETAIL,
    UPDATE_RELATIONSHIP,
    GET_FRIENDS_YOU_LIKED,
    GET_FRIENDS_LIKED_YOU,
    GET_FRIENDS_VISITED
} from './types';

export const logout = () => dispatch => {
    api.get(`/logout`).then(response => {
        console.log(response);
        window.location.reload();
    }).catch(err => {
        console.log(err);
    })
}

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
    return new Promise((resolve, reject) => {
        return api.get(`/user/${id}`)
            .then(response => {
                dispatch({type: GET_USER_DETAIL, payload: response.data});
                resolve(response.data);
            })
            .catch(err => {
                console.log(err);
                reject(error);
            })
    });
    
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
        } else if (type == 'visited') {
            dispatch({type: GET_FRIENDS_VISITED, payload: response.data});
        }
    })
    .catch(err => {
        console.log(err);
    })
}

export const uploadIdCardPhoto = (data, id) => dispatch => {
    api.post(`/user/${id}/upload-id-card`, data).then(res => {
        dispatch({type: UPDATE_USER_DETAIL, payload: res.data});
        window.location.reload();
    }).catch(err => {
        console.log(err);
        window.alert("Đã có lỗi xảy ra. Vui lòng thử lại");
    })
}

