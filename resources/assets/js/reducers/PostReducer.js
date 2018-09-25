import {
    GET_ALL_POSTS,
    CREATE_NEW_POST
} from '../actions/types';

const INIT_STATE = {
    posts: [],
    newPost: {}
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_POSTS: {
            return {...state, posts: action.payload}
        }
        case CREATE_NEW_POST: {
            return {...state, newPost: action.payload}
        }
        default: {
            return {...state};
        }
    }
}