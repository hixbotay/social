import {
    GET_ALL_PROVINCES,
    GET_ALL_DISTRICTS,
    GET_ALL_COMMUNES
} from '../actions/types';

const INIT_STATE = {
    provinces: [],
    districts: [],
    communes: []
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_PROVINCES: {
            return {...state, provinces: action.payload}
        }
        case GET_ALL_DISTRICTS: {
            return {...state, districts: action.payload}
        }
        case GET_ALL_COMMUNES: {
            return {...state, communes: action.payload}
        }
        default: {
            return {...state}
        }
    }
}