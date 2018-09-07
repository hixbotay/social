import {GET_ALL_COUNTRIES} from '../actions/types';

const INIT_STATE = [];

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_COUNTRIES: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}