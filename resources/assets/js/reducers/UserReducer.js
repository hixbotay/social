import {
    GET_CURRENT_USER,
    GET_CURRENT_USER_DETAIL,
    GET_USER_DETAIL,
    UPDATE_USER_DETAIL,
    UPDATE_RELATIONSHIP,
    GET_FRIENDS_LIKED_YOU,
    GET_FRIENDS_YOU_LIKED,
    GET_FRIENDS_VISITED
} from '../actions/types';

const INIT_STATE = {
    current_user: {},
    user: {},
    user_hobbies: [],
    other_user_data: {
        user: {},
        hobbies: [],
        posts: [],
        relationship: {},
        friendsYouLiked: [],
        friendsLikeYou: [],
        friendsVisited: []
    }
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_CURRENT_USER: {
            return {...state, current_user: action.payload}
        }
        case GET_USER_DETAIL: {
            return {...state, other_user_data: action.payload}
        }
        case GET_CURRENT_USER_DETAIL: {
            return {
                ...state, 
                user: action.payload.user, 
                user_hobbies: action.payload.hobbies, 
                relationship: action.payload.relationship
            }
        }
        case UPDATE_USER_DETAIL: {
            return {...state, user: action.payload}
        }
        case UPDATE_RELATIONSHIP: {
            return {...state}
        }
        case GET_FRIENDS_LIKED_YOU: {
            return {...state, friendsLikeYou: action.payload}
        }
        case GET_FRIENDS_YOU_LIKED: {
            return {...state, friendsYouLiked: action.payload}
        }
        case GET_FRIENDS_VISITED: {
            return {...state, friendsVisited: action.payload}
        }
        default: {
            return {...state};
        }
    }
}