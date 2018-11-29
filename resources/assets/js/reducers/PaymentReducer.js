import {
    CHARGE_PAYMENT
} from '../actions/types';

const INIT_STATE = {
    amount: 0,
    transaction: []
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case CHARGE_PAYMENT: {
            return {...state, payment: action.payload}
        }
        default: {
            return {...state};
        }
    }
}