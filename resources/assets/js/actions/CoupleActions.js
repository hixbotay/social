import api from '../api';
import {
    GET_COUPLE_RESULTS,
    DISMISS_COUPLE
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

export const dismiss = (user_id) => (dispatch) => {
    api.post('/couple/dismiss', {user_id}).then(res => {
        dispatch({type: DISMISS_COUPLE});
    }).catch(err => {
        console.log(err);
    })
}