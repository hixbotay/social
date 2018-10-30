import {
    GET_COUPLE_RESULTS,
    DISMISS_COUPLE
} from '../actions/types';

const INIT_STATE = {
    search_results : [],
}

export default (state=INIT_STATE, action) => {
    switch(action.type) {
        case GET_COUPLE_RESULTS: {
            return {...state, search_results: action.payload};
        }
        case DISMISS_COUPLE: {
            return {...state};
        }
        default: {
            return {...state};
        }
    }
}