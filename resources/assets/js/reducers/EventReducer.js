import {
    GET_ALL_EVENTS,
    CREATE_NEW_EVENT
} from '../actions/types';

const INIT_STATE = {
    events: [],
    newEvent: {}
}

export default (state=INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_EVENTS: {
            return {...state, events: action.payload}
        }
        case CREATE_NEW_EVENT: {
            return {...state, newEvent: action.payload}
        }
        default: {
            return {...state}
        }
    }
}