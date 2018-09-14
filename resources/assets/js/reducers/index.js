import {combineReducers} from 'redux';

import newfeedsReducer from './NewFeedsReducer';
import userReducer from './UserReducer';
import CafeReducer from './CafeReducer';

const rootReducer = combineReducers({
    newfeeds: newfeedsReducer,
    user: userReducer,
    cafe: CafeReducer,

});

export default rootReducer;
