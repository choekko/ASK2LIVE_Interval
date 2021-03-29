import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import session from './session';
import messages from './messages';
import authorize from './authorize';
import questionlist from './questionlist';
import enteredSession from './enteredSession'

const rootReducer = combineReducers({
    counter,
    user,
    session,
    messages,
    authorize,
    questionlist,
    enteredSession,
});

export default rootReducer;