import {
    CHARGE_PAYMENT
} from '../actions/types';

const INIT_STATE = {
    cafes: [],
    newCafe: {},
    currentCafe: {},
    results: []
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case CHARGE_PAYMENT: {
            return {...state, cafes: action.payload}
        }
        default: {
            return {...state};
        }
    }
}