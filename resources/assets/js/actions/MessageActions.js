import {
    GET_LIST_CHAT,
    CHANGE_LIST_CHAT
} from './types';
import api from '../api';
import chatApi from '../api/chat';

var chatURL = 'https://chat.noiduyen.vn/';

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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function(response) {
                return response.json()
            }).then(function(json) {
            resolve(json);
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })

    })
}

export const loadMessage = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        fetch(chatURL + 'message/load/' + data.conversation_id + '/' + data.page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(function(response) {
                console.log(response);
                resolve(response.json());
            }).then(function(json) {
                resolve(json);
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
    })
}


// data {conversation_id: xxxxx, last_message: YYYYYY}
export const changeListChast = (data) => (dispatch) =>{
    return new Promise((resolve, reject) => {
        dispatch({type: CHANGE_LIST_CHAT, payload: data});
        resolve(data);
    });
}


export const findUsers = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.post('chat/find-users', data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}



export const DanhSach = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        chatApi.get('hello', data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    })
}

export const unreadCount = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {

        fetch(chatURL + 'conversation/unreadcount/'+data.user_id, {
            method: 'GET',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(function(response) {
                resolve(response.json())
            })
            .catch(function(ex) {
                reject(ex)
            })
    })
}

