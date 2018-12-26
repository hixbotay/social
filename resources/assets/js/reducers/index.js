import {combineReducers} from 'redux';

import postReducer from './PostReducer';
import userReducer from './UserReducer';
import CafeReducer from './CafeReducer';
import hobbyReducer from './HobbyReducers';
import coupleReducer from './CoupleReducer';
import eventReducer from './EventReducer';
import jobReducer from './JobReducer';
import addressReducer from './AddressReducer';
import educationReducer from './EducationReducer';
import notificationReducer from './NotificationReducer';
import messageReducer from './MessageReducer';
import PaymentReducer from './PaymentReducer';
import ethnicityReducer from './EthnicityReducer';
import religionReducer from './ReligionReducer';
import productReducer from './ProductReducer';

const rootReducer = combineReducers({
    post: postReducer,
    user: userReducer,
    cafe: CafeReducer,
    hobby: hobbyReducer,
    couple: coupleReducer,
    event: eventReducer, 
    job: jobReducer,
    address: addressReducer,
    education: educationReducer,
    notification: notificationReducer,
    chat: messageReducer,
    payment: PaymentReducer,
    ethnicity: ethnicityReducer,
    religion: religionReducer,
    product: productReducer
});

export default rootReducer;
