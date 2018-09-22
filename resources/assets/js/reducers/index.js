import {combineReducers} from 'redux';

import newfeedsReducer from './NewFeedsReducer';
import userReducer from './UserReducer';
import CafeReducer from './CafeReducer';
import hobbyReducer from './HobbyReducers';
import coupleReducer from './CoupleReducer';

const rootReducer = combineReducers({
    newfeeds: newfeedsReducer,
    user: userReducer,
    cafe: CafeReducer,
    hobby: hobbyReducer,
    couple: coupleReducer
});

export default rootReducer;
