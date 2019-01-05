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
            console.log(data);

            for (let i = 0; i < state.chatList.length; i ++) {
                if (state.chatList[i].conversation_id === data.conversation_id){
                    data.index = i;
                    break;
                }
            }

            return {
                ...state,
                chatList: state.chatList.map(
                    (content, i) => i === data.index ? {...content, content: data.last_message, seen: data.seen}
                        : content
                )
            }
        }
        default: {
            return {...state};
        }
    }
}