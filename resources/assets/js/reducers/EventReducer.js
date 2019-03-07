import {
    GET_ALL_EVENTS,
    GET_FORTHCOMING_EVENTS,
    GET_FINISHED_EVENTS,
    GET_CANCELLED_EVENTS,
    GET_AROUND_EVENTS,
    GET_EVENTS_HAS_YOUR_CRUSH,
    GET_INVITED_EVENTS,
    GET_UPCOMING_EVENTS,
    CREATE_GROUP_EVENT,
    CREATE_COUPLE_EVENT,
    JOIN_EVENT,
    GET_EVENT_DETAIL,
    INVITE_INTO_EVENT,
    SEARCH_EVENTS,
    SUBSCRIBE_EVENT,
    GET_SUBSCRIBERS,
    REVIEW_DATING,
    GET_MY_SUBSCRIBERS,
    DELETE_SUBSCRIBER,
    CANCEL_EVENT_BY_MEMBER,
    RESET_EVENT,
    REFUSE_REGISTER
} from '../actions/types';

const INIT_STATE = {
    events: [],
    currentEvent: {
        job: [],
        marital_status: [],
        registers: [],
        creator: {}
    },
    forthcomingEvents: [],
    finishedEvents: [],
    cancelledEvents: [],
    aroundEvents:  [],
    eventsHasYourCrush: [],
    upcomingEvents: [],
    newEvent: {},
    invitedEvents: [],
    results: [],
    subscribers: [],
    mySubscribers: []
}

export default (state=INIT_STATE, action) => {
    switch(action.type) {
        case GET_ALL_EVENTS: {
            return {...state, events: action.payload}
        }
        case GET_FORTHCOMING_EVENTS: {
            return {...state, forthcomingEvents: action.payload}
        }
        case GET_FINISHED_EVENTS: {
            return {...state, finishedEvents: action.payload}
        }
        case GET_CANCELLED_EVENTS: {
            return {...state, cancelledEvents: action.payload}
        }
        case GET_AROUND_EVENTS: {
            return {...state, aroundEvents: action.payload}
        }
        case GET_EVENTS_HAS_YOUR_CRUSH: {
            return {...state, eventsHasYourCrush: action.payload}
        }
        case GET_UPCOMING_EVENTS: {
            return {...state, upcomingEvents: action.payload}
        }
        case CREATE_GROUP_EVENT: {
            return {...state, newEvent: action.payload}
        }
        case CREATE_COUPLE_EVENT: {
            return {...state, newEvent: action.payload}
        }
        case JOIN_EVENT: {
            return {...state}
        }
        case GET_EVENT_DETAIL: {
            return {...state, currentEvent: action.payload}
        }
        // case INVITE_INTO_EVENT: {
        //     return {...state, newInvitation: action.payload}
        // }
        case GET_INVITED_EVENTS: {
            return {...state, invitedEvents: action.payload}
        }
        case SEARCH_EVENTS: {
            return {...state, results: action.payload}
        }
        case SUBSCRIBE_EVENT: {
            return {...state}
        }
        case GET_SUBSCRIBERS: {
            return {...state, subscribers: action.payload}
        }
        case REVIEW_DATING: {
            return {...state};
        }
        case GET_MY_SUBSCRIBERS: {
            return {...state, mySubscribers: action.payload}
        }
        case DELETE_SUBSCRIBER: {
            var temp = state.mySubscribers.filter(item => {
                return item.id !== action.payload
            })
            return {...state, mySubscribers: temp}
            // return {...state}
        }
        case CANCEL_EVENT_BY_MEMBER: {
            return {...state}
        }
        case RESET_EVENT: {
            return {...state}
        }
        case REFUSE_REGISTER: {
            return {...state}
        }
        default: {
            return {...state}
        }
    }
}