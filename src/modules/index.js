import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import session from './session';

const rootReducer = combineReducers({
    counter,
    user,
    session,
});

export default rootReducer;