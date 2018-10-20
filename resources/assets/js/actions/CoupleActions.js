import api from '../api';
import {
    GET_COUPLE_RESULTS,
    GET_COUPLE_DETAIL
} from './types';

export const getCoupleResults = (filter) => (dispatch) => {
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

    return new Promise((resolve, reject) => {
        return api.get(`/couple/search?${filter_string}`)
        .then(response => {
            dispatch({type: GET_COUPLE_RESULTS, payload: response.data.data});
            resolve( response.data.data);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        })
    }) 
}

export const getCoupleDetail = (id) => (dispatch) => {
    api.get(`/couple/view/${id}`)
    .then(response => {
        console.log(response.data);
        dispatch({type: GET_COUPLE_DETAIL, payload: response.data});
    })
    .catch(error => {
        console.log(error);
    })
}