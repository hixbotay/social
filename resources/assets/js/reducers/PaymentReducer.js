import {
    CHARGE_PAYMENT,
    LOAD_PRICE_CONFIG
} from '../actions/types';

const INIT_STATE = {
    amount: 0,
    transaction: [],
    price: []
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case CHARGE_PAYMENT: {
            return {...state, payment: action.payload}
        }
        case LOAD_PRICE_CONFIG: {
            return {...state, price: action.payload}
        }
        default: {
            return {...state};
        }
    }
}