import { GET_ALL_COUNTRIES } from './types';
const axios = require('axios');

var data = [];

export const getAllCountries = () => (dispatch) => {
    
    axios.get('http://127.0.0.1:8080/zeno5/social/api/country')
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