import {
    GET_LIST_CHAT
} from './types';
import api from '../api';
import chatApi from '../api/chat';

var chatURL = 'http://chat.noiduyen.vn/';

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

export const createConversation = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {

        fetch(chatURL + 'conversation/create', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function(response) {
                return response.json()
            }).then(function(json) {
            console.log('parsed json', json)
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })

        // chatApi.post('conversation/create', data)
        //     .then(response => {
        //         resolve(response.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    })
}


export const DanhSach = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        chatApi.get('hello', data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                console.log("__________________________");
                console.log(err);
            })
    })
}

