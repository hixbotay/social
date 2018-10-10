import {GET_ALL_JOBS} from '../actions/types';

const INIT_STATE = {
    jobs: []
};

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_JOBS: {
            return {...state, jobs: action.payload};
        }
        default: {
            return {...state};
        }
    }
}