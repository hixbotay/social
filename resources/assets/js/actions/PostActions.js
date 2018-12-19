import api from '../api';
import {
    GET_ALL_POSTS,
    REACT_POST,
    UNREACT_POST,
    CREATE_NEW_POST,
    GET_MY_POSTS,
    SHARE_POST
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

export const reactPost = (actionType, id) => (dispatch) => {
    console.log(actionType);
    api.post(`/post/react/${id}`, JSON.stringify(actionType))
        .then(response => {
            console.log(response.data);
            dispatch({ type: REACT_POST });
        })
        .catch(error => {
            console.log(error);
        });
}

export const unreactPost = (actionType, id) => (dispatch) => {
    console.log(actionType);
    api.post(`/post/unreact/${id}`, JSON.stringify(actionType))
        .then(response => {
            console.log(response.data);
            dispatch({ type: UNREACT_POST });
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

export const share = (post_id) => dispatch => {
    api.post('/post/share', {post_id: post_id})
    .then(response => {
        dispatch({type: SHARE_POST, payload: response.data});
        window.alert("Bạn đã chia sẻ thành công");
    })
    .catch(error => {
        console.log(error);
    })
}