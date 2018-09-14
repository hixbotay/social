import {GET_ALL_PROVINCE, GET_ALL_DISTRICT} from '../actions/types';

const INIT_STATE = {
    allprovince: {},
    alldicstrict: {}
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_PROVINCE: {
            return {...state, allprovince: action.payload}
        }
        case GET_ALL_DISTRICT: {
            return {...state, alldicstrict: action.payload}
        }
        default: {
            return {...state};
        }
    }
}