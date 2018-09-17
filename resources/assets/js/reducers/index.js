import {combineReducers} from 'redux';

import newfeedsReducer from './NewFeedsReducer';
import userReducer from './UserReducer';
import CafeReducer from './CafeReducer';
import hobbyReducer from './HobbyReducers';

const rootReducer = combineReducers({
    newfeeds: newfeedsReducer,
    user: userReducer,
    cafe: CafeReducer,
    hobby: hobbyReducer
});

export default rootReducer;
