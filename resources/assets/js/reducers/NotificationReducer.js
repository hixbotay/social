import {
    GET_NOTIFICATIONS,
    MARK_READ,
    MARK_ALL_AS_READ,
    GET_UNREAD_NUMBER,
    UPDATE_UNREAD_NUMBER
} from '../actions/types';

const INIT_STATE = {
    notifications: [],
    unreadNumber: 0
};

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_NOTIFICATIONS: {
            return {...state, notifications: action.payload};
        }
        case MARK_READ: {
            return {...state};
        }
        case MARK_ALL_AS_READ: {
            return {...state};
        }
        case GET_UNREAD_NUMBER: {
            return {...state, unreadNumber: action.payload}
        }
        case UPDATE_UNREAD_NUMBER: {
            return {...state, unreadNumber: state.unreadNumber >= 1 ? state.unreadNumber - 1 : 0}
        }
        default: {
            return {...state};
        }
    }
}