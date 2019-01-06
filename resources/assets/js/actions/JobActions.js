import {
    GET_ALL_JOBS
} from './types';
import api from '../api';

export const getAllJobs = () => (dispatch) => {
    api.get('/jobs')
        .then(response => {
            dispatch({type: GET_ALL_JOBS, payload: response.data})
        })
        .catch(err => {
            console.log(err);
        })
}


export const getJobs = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api.get('/jobs')
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}