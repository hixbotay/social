import {GET_RELIGION} from '../actions/types';

const INIT_STATE = {
    religions: []
};

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_RELIGION: {
            return {...state, religions: action.payload.religions};
        }
        default: {
            return {...state};
        }
    }
}