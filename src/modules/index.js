import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import session from './session';
import messages from './messages';

const rootReducer = combineReducers({
    counter,
    user,
    session,
    messages,
});

export default rootReducer;