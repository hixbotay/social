import api from '../api';
import {
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCTS,
    GET_PRODUCT_DETAIL,
    GET_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART
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

export const getCart = (receiver) => dispatch => {
    api.get(`/cart?receiver=${receiver}`).then(res => {
        dispatch({type: GET_CART, payload: res.data});
    }).catch(err => {
        console.log(err)
    })
}

export const addToCart = (data) => dispatch => {
    api.post(`/cart/add`, data).then(res => {
        dispatch({type: ADD_TO_CART, payload: res.data});
    }).catch(err => {
        console.log(err)
    })
}

export const removeFromCart = (id) => dispatch => {
    api.delete(`/cart/${id}`).then(res => {
        dispatch({type: REMOVE_FROM_CART, payload: res.data});
        // window.location.reload();
    }).catch(err => {
        console.log(err)
    })
}