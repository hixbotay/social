import {
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCTS
} from '../actions/types';

const INIT_STATE = {
    categories: [],
    products: []
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_PRODUCT_CATEGORIES: {
            return {...state, categories: action.payload}
        }
        case GET_PRODUCTS: {
            return {...state, products: action.payload}
        }
        default: {
            return {...state}
        }
    }
}
