import {combineReducers} from 'redux';

import newfeedsReducer from './NewFeedsReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
    newfeeds: newfeedsReducer,
    user: userReducer

});

export default rootReducer;
