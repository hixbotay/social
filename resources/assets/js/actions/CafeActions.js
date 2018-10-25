import api from '../api';
import {
    GET_CAFE_DETAIL,
    GET_ALL_CAFE, 
    CREATE_NEW_CAFE,
    UPDATE_CAFE_IMAGE,
    SEARCH_CAFE
} from './types'

export const getAllCafe = (filter = {}, page = 1) => (dispatch) => {
    var filter_string = '';
    Object.keys(filter).map(key => {
        if(Array.isArray(filter[key])) {
            filter[key].map(item => {
                filter_string = filter_string.concat(`&${key}=${item}`);
            })
        } else {
            filter_string = filter_string.concat(`&${key}=${filter[key]}`);
        }
    });
    return api.get(`/cafes?page=${page}${filter_string}`)
        .then(response => {
            console.log(`/cafes?page=${page}${filter_string}`);
            dispatch({type: GET_ALL_CAFE, payload: response.data});
        })
        .catch(err => {
            console.log(err);
        })
}

export const getCafeDetail = (id) => (dispatch) => {
    return api.get(`/cafe/${id}`)
        .then(response => {
            dispatch({type: GET_CAFE_DETAIL, payload: response.data});
        })
        .catch(err => {
            console.log(err);
        })
}

export const createCafe = (data) => (dispatch) => {
    return api.post('/cafe/create', data)
        .then(response => {
            console.log(response.data);
            dispatch({type: CREATE_NEW_CAFE, payload: response.data});
            window.location.href = `${baseUrl}/cafe/${response.data.id}/view`;
        })
        .catch(error => {
            console.log(error);
        })
}

export const updateImage = (data, id) => (dispatch) => {
    return api.post(`/cafe/image/${id}`, data)
        .then(response => {
            dispatch({type: UPDATE_CAFE_IMAGE, payload: response.data});
        })
        .catch(error => {
            console.log(error);
        })
} 

export const searchCafe = (filter = {}, page = 1) => (dispatch) => {
    var filter_string = '';
    Object.keys(filter).map(key => {
        if(Array.isArray(filter[key])) {
            filter[key].map(item => {
                filter_string = filter_string.concat(`&${key}=${item}`);
            })
        } else {
            filter_string = filter_string.concat(`&${key}=${filter[key]}`);
        }
    });
    return api.get(`/cafe/search?${filter_string}`)
        .then(response => {
            dispatch({type: SEARCH_CAFE, payload: response.data.data});
        })
        .catch(err => {
            console.log(err);
        })
}