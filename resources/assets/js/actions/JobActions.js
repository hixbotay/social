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
