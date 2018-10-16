import {GET_EDUCATION} from '../actions/types';

const INIT_STATE = {
    educations: []
};

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_EDUCATION: {
            return {...state, educations: action.payload};
        }
        default: {
            return {...state};
        }
    }
}