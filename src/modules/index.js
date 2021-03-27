import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import session from './session';
import messages from './messages';
import member from './member';
import authorize from './authorize';
import questionlist from './questionlist';

const rootReducer = combineReducers({
    counter,
    user,
    session,
    messages,
    member,
    authorize,
    questionlist,
});

export default rootReducer;