import {
    GET_ALL_HOBBIES
} from './types';
import api from '../api';

export const getAllHobbies = () => (dispatch) => {
    api.get('/hobbies')
        .then(response => {
            dispatch({type: GET_ALL_HOBBIES, payload: response.data})
        })
        .catch(err => {
            console.log(err);
        })
}
