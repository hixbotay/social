import {GET_LIST_CHAT, CHANGE_LIST_CHAT} from '../actions/types';

const INIT_STATE = {
    chatList: []
};

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_LIST_CHAT: {
            return {...state, chatList: action.payload};
        }
        case CHANGE_LIST_CHAT: {
            var data = action.payload;
            return {
                ...state,
                chatList: state.chatList.map(
                    (content, i) => i === data.index ? {...content, conversation_id: data.conversation_id, last_message: data.last_message}
                        : content
                )
            }
        }
        default: {
            return {...state};
        }
    }
}