import {GET_ALL_HOBBIES} from '../actions/types';

const INIT_STATE = {
    hobbies: []
};

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_HOBBIES: {
            return {...state, hobbies: action.payload};
        }
        default: {
            return {...state};
        }
    }
}