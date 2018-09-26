import {
    GET_CURRENT_USER,
    GET_CURRENT_USER_DETAIL,
    GET_USER_DETAIL,
    UPDATE_USER_DETAIL,
} from '../actions/types';

const INIT_STATE = {
    current_user: {},
    user: {},
    user_hobbies: [],
    other_user_data: {
        user: {},
        hobbies: [],
        posts: []
    }
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_CURRENT_USER: {
            return {...state, current_user: action.payload}
        }
        case GET_USER_DETAIL: {
            return {...state, other_user_data: action.payload}
        }
        case GET_CURRENT_USER_DETAIL: {
            return {...state, user: action.payload.user, user_hobbies: action.payload.hobbies}
        }
        case UPDATE_USER_DETAIL: {
            return {...state, user: action.payload}
        }
        default: {
            return {...state};
        }
    }
}