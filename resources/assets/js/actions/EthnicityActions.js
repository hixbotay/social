import api from '../api';
import {
    GET_ETHNICITY
} from './types';

export const getEthnicities = () => dispatch => {
    api.get('/ethnicities').then(response => {
        dispatch({type: GET_ETHNICITY, payload: response.data.ethnicities});
    })
    .catch(err => {
        console.log(err);
    })
}