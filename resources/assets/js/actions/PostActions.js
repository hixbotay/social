import api from '../api';
import {
    GET_ALL_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    CREATE_NEW_POST,
    GET_MY_POSTS
} from './types'

export const getAllPosts = () => (dispatch) => {
    api.get('/posts')
        .then(response => {
            dispatch({ type: GET_ALL_POSTS, payload: response.data });
        })
        .catch(err => {
            console.log(err);
        })
}

export const getMyPosts = () => (dispatch) => {
    api.get('/my-posts')
        .then(response => {
            dispatch({ type: GET_MY_POSTS, payload: response.data });
        })
        .catch(err => {
            console.log(err);
        })
}

export const likePost = (actionType, id) => (dispatch) => {
    console.log(actionType);
    api.post(`/post/like/${id}`, JSON.stringify(actionType))
        .then(response => {
            console.log(response.data);
            dispatch({ type: LIKE_POST });
        })
        .catch(error => {
            console.log(error);
        });
}

export const unlikePost = (actionType, id) => (dispatch) => {
    console.log(actionType);
    api.post(`/post/unlike/${id}`, JSON.stringify(actionType))
        .then(response => {
            console.log(response.data);
            dispatch({ type: UNLIKE_POST });
        })
        .catch(error => {
            console.log(error);
        });
}

export const createPost = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.post('/post', data)
        .then(response => {
            dispatch({ type: CREATE_NEW_POST, payload: response.data });
            resolve(response.data);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        })
    })
}