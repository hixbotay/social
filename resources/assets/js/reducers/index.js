import countryReducer from './CountryReducer';
import {combineReducers} from 'redux';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
    country: countryReducer,
    user: userReducer

});

export default rootReducer;
