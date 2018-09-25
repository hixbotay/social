import {combineReducers} from 'redux';

import postReducer from './PostReducer';
import userReducer from './UserReducer';
import CafeReducer from './CafeReducer';
import hobbyReducer from './HobbyReducers';
import coupleReducer from './CoupleReducer';

const rootReducer = combineReducers({
    post: postReducer,
    user: userReducer,
    cafe: CafeReducer,
    hobby: hobbyReducer,
    couple: coupleReducer
});

export default rootReducer;
