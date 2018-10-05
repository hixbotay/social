import {
    GET_ALL_EVENTS
} from '../actions/types';

const INIT_STATE = {
    events: []
}

export default (state=INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_EVENTS: {
            return {...state, events: action.payload}
        }
        default: {
            return {...state}
        }
    }
}