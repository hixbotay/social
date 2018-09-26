import {
    GET_ALL_PROVINCE,
    GET_ALL_DISTRICT,
    GET_ALL_CAFE,
    GET_CAFE_DETAIL,
    GET_ALL_COMMUNE
} from '../actions/types';

const INIT_STATE = {
    allprovince: [{
        matp: null,
        name: null
    }],
    alldistrict: [{
        maqh: null,
        name: null
    }],
    allCommune: [{
        xaid: null,
        name: null
    }],
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_PROVINCE: {
            return {...state, allprovince: action.payload}
        }
        case GET_ALL_DISTRICT: {
            return {...state, alldistrict: action.payload}
        }
        case GET_ALL_CAFE: {
            return {...state, allcafe: action.payload}
        }
        case GET_CAFE_DETAIL: {
            return {...state, cafe: action.payload}
        }
        case GET_ALL_COMMUNE: {
            return {...state, allCommune: action.payload}
        }
        default: {
            return {...state};
        }
    }
}