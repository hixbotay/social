import {GET_ALL_POSTS} from '../actions/types';

const INIT_STATE = {
    posts: []
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_POSTS: {
            return {...state, posts: action.payload}
        }
        default: {
            return {...state};
        }
    }
}