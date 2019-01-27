import api from '../api';
import {
    GET_ALL_POSTS,
    REACT_POST,
    UNREACT_POST,
    CREATE_NEW_POST,
    GET_MY_POSTS,
    SHARE_POST,
    UPDATE_POST,
    REMOVE_POST
} from './types';
import store from '../store';

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
    api.post(`/post/unreact/${id}`, JSON.stringify(actionType))
        .then(response => {
            dispatch({ type: UNREACT_POST });
        })
        .catch(error => {
            console.log(error);
        });
}

export const createPost = (data) => (dispatch) => {
    const user = store.getState().user.current_user;
    return new Promise((resolve, reject) => {
        api.post('/post', data)
        .then(res => {
            var post = {
                ...res.data.post,
                like: null,
                dislike: null,
                user_name: user.name,
                user_avatar: user.avatar,
            }
            dispatch({ type: CREATE_NEW_POST, payload: post });
            resolve(res.data.post);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        })
    })
}

export const share = (post_id) => dispatch => {
    const user = store.getState().user.current_user;
    return new Promise((resolve, reject) => {
        api.post('/post/share', {post_id: post_id})
        .then(res => {
            var post = {
                ...res.data.post,
                like: null,
                dislike: null,
                user_name: user.name,
                user_avatar: user.avatar,
            }
            dispatch({type: SHARE_POST, payload: post});
            window.alert("Bạn đã chia sẻ thành công");
            resolve(res.data.post);
        })
        .catch(error => {
            reject(error);
        })
    })
}

export const updatePost = (data, id) => dispatch =>  {
    const user = store.getState().user.current_user;
    return new Promise((resolve, reject) => {
        api.put(`/post/${id}`, data).then(res => {
            var post = {
                ...res.data.post,
                like: null,
                dislike: null,
                user_name: user.name,
                user_avatar: user.avatar,
            }
            dispatch({type: UPDATE_POST, payload: post});
            resolve(res.data.post)
        })
        .catch(err => {
            reject(err);
        })
    });
}

export const removePost = (id) => dispatch =>  {
    api.delete(`/post/${id}`).then(res => {
        dispatch({type: REMOVE_POST, payload: id});
    })
    .catch(err => {
        console.log(err);
    })
}