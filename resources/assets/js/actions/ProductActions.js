import api from '../api';
import {
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCTS,
    GET_PRODUCT_DETAIL,
    GET_CART,
    ADD_TO_CART
} from './types';

export const getProductCategories = (type) => dispatch => {
    api.get(`/product-categories/${type}`).then(res => {
        dispatch({type: GET_PRODUCT_CATEGORIES, payload: res.data.categories});
    }).catch(err => {
        console.log(err)
    })
}

export const getProducts = (query) => dispatch => {
    api.get('/products', {params: query}).then(res => {
        dispatch({type: GET_PRODUCTS, payload: res.data.products});
    }).catch(err => {
        console.log(err)
    })
}

export const getProductDetail = (id) => dispatch => {
    api.get(`/products/${id}`).then(res => {
        dispatch({type: GET_PRODUCT_DETAIL, payload: res.data.product});
    }).catch(err => {
        console.log(err)
    })
}

export const getCart = () => dispatch => {
    api.get(`/cart`).then(res => {
        dispatch({type: GET_CART, payload: res.data});
    }).catch(err => {
        console.log(err)
    })
}

export const addToCart = (data) => dispatch => {
    api.post(`/cart/add`, data).then(res => {
        console.log(res.data)
        dispatch({type: ADD_TO_CART, payload: res.data});
    }).catch(err => {
        console.log(err)
    })
}