import {
    GET_ALL_EVENTS,
    GET_FORTHCOMING_EVENTS,
    GET_FINISHED_EVENTS,
    GET_CANCELLED_EVENTS,
    GET_AROUND_EVENTS,
    GET_EVENTS_HAS_YOUR_CRUSH,
    CREATE_NEW_EVENT,
    JOIN_EVENT
} from '../actions/types';

const INIT_STATE = {
    events: [],
    forthcomingEvents: [],
    finishedEvents: [],
    cancelledEvents: [],
    aroundEvents:  [],
    eventsHasYourCrush: [],
    newEvent: {}
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
        case CREATE_NEW_EVENT: {
            return {...state, newEvent: action.payload}
        }
        case JOIN_EVENT: {
            return {...state}
        }
        default: {
            return {...state}
        }
    }
}