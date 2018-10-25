import {
    GET_ALL_CAFE,
    GET_CAFE_DETAIL,
    CREATE_NEW_CAFE,
    UPDATE_CAFE_IMAGE,
    SEARCH_CAFE
} from '../actions/types';

const INIT_STATE = {
    cafes: [],
    newCafe: {},
    currentCafe: {},
    results: []
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_CAFE: {
            return {...state, cafes: action.payload}
        }
        case CREATE_NEW_CAFE: {
            return {...state, newCafe: action.payload}
        }
        case GET_CAFE_DETAIL: {
            return {...state, currentCafe: action.payload}
        }
        case UPDATE_CAFE_IMAGE: {
            return {...state, currentCafe: action.payload}
        }
        case SEARCH_CAFE: {
            return {...state, results: action.payload}
        }
        default: {
            return {...state};
        }
    }
}