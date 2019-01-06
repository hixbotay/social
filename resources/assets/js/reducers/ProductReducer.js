import {
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCTS,
    GET_PRODUCT_DETAIL,
    GET_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART
} from '../actions/types';

const INIT_STATE = {
    categories: [],
    products: [],
    product: {
        photos: []
    },
    cartItems: [],
    cartTotal: 0
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_PRODUCT_CATEGORIES: {
            return {...state, categories: action.payload}
        }
        case GET_PRODUCTS: {
            return {...state, products: action.payload}
        }
        case GET_PRODUCT_DETAIL: {
            return {...state, product: action.payload}
        }
        case GET_CART: {
            return {...state, cartItems: action.payload.cartItems, cartTotal: action.payload.total}
        }
        case ADD_TO_CART: {
            return {...state, cartItems: action.payload.cartItems, cartTotal: action.payload.total}
        }
        case REMOVE_FROM_CART: {
            return {...state, cartItems: action.payload.cartItems, cartTotal: action.payload.total}
        }
        default: {
            return {...state}
        }
    }
}
