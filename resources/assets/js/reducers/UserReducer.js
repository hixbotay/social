import {
    GET_USER_DETAIL,
    UPDATE_USER_DETAIL
} from '../actions/types';

const INIT_STATE = {
    user: {}
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_USER_DETAIL: {
            return {...state, user: action.payload}
        }
        case UPDATE_USER_DETAIL: {
            return {...state, user: action.payload}
        }
        default: {
            return {...state};
        }
    }
}