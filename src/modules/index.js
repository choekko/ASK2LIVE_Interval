import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import session from './session';
import messages from './messages';
import member from './member';
import authorize from './authorize';

const rootReducer = combineReducers({
    counter,
    user,
    session,
    messages,
    member,
    authorize,
});

export default rootReducer;