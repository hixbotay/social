import {GET_LIST_CHAT} from '../actions/types';

const INIT_STATE = {
    chatList: []
};

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_LIST_CHAT: {
            return {...state, chatList: action.payload};
        }
        default: {
            return {...state};
        }
    }
}