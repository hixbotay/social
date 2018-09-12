import api from '../api';
import {
    GET_ALL_POSTS
} from './types'

export const getAllPosts = () => (dispatch) => {
    api.get('/posts')
    .then(response => {
        dispatch({type: GET_ALL_POSTS, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}