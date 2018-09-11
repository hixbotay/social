import { GET_ALL_COUNTRIES, GET_USER_DETAIL } from './types';
import api from '../api';
const axios = require('axios');

var data = [];

export const getAllCountries = () => (dispatch) => {
    api.get('/country')
        .then(function (response) {
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: response.data
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
} 

export const getUserDetail = (id) => (dispatch) => {
    api.get(`/user/${id}`)
    .then(response => {
        dispatch({type: GET_USER_DETAIL, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}