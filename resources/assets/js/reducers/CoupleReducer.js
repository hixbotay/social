import {
    GET_COUPLE_RESULTS,
    GET_COUPLE_DETAIL
} from '../actions/types';

const INIT_STATE = {
    search_results : [],
    coupleDetail: {
        user: {},
        photos: []
    }
}

export default (state=INIT_STATE, action) => {
    switch(action.type) {
        case GET_COUPLE_RESULTS: {
            return {...state, search_results: action.payload};
        }

        case GET_COUPLE_DETAIL: {
            return {...state, coupleDetail: action.payload};
        }

        default: {
            return {...state};
        }
    }
}