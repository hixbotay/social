import {
    GET_ALL_POSTS,
    CREATE_NEW_POST,
    GET_MY_POSTS,
    SHARE_POST,
    UPDATE_POST,
    REMOVE_POST
} from '../actions/types';

const INIT_STATE = {
    posts: [],
    // myPosts: [],
    newPost: {}
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_POSTS: {
            return {...state, posts: action.payload}
        }
        case CREATE_NEW_POST: {
            var updatedPosts =  [action.payload, ...state.posts];
            return {...state, newPost: action.payload, posts: updatedPosts};
        }
        case GET_MY_POSTS: {
            return {...state, posts: action.payload}
        }
        case SHARE_POST: {
            var updatedPosts =  [action.payload, ...state.posts];
            return {...state, posts: updatedPosts};
        }
        case UPDATE_POST: {
            var updatedPosts = state.posts.map(post => {
                if(post.id === action.payload.id) {
                    return action.payload;
                } else {
                    return post;
                }
            });
            return {...state, posts: updatedPosts}
        }
        case REMOVE_POST: {
            var updatedPosts = state.posts.filter(post => {
                return post.id !== action.payload
            });

            return {...state, posts: updatedPosts}
        }
        default: {
            return {...state};
        }
    }
}