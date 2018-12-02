import {GET_ETHNICITY} from '../actions/types';

const INIT_STATE = {
    ethnicities: []
};

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ETHNICITY: {
            return {...state, ethnicities: action.payload};
        }
        default: {
            return {...state};
        }
    }
}