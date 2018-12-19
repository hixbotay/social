import {
    GET_ALL_POSTS,
    CREATE_NEW_POST,
    GET_MY_POSTS,
    SHARE_POST
} from '../actions/types';

const INIT_STATE = {
    posts: [],
    myPosts: [],
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
        case GET_MY_POSTS: {
            return {...state, myPosts: action.payload}
        }
        case SHARE_POST: {
            return {...state}
        }
        default: {
            return {...state};
        }
    }
}