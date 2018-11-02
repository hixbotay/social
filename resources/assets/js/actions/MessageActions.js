import {
    GET_LIST_CHAT
} from './types';
import api from '../api';

export const getListChat = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get('/chat/list')
            .then(response => {
                dispatch({type: GET_LIST_CHAT, payload: response.data});
                resolve(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    })
}
