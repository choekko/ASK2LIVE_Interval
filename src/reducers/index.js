import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import session from './session';
import messages from './messages';
import authorize from './authorize';
import questionlist from './questionlist';

const rootReducer = combineReducers({
    counter,
    user,
    session,
    messages,
    authorize,
    questionlist,
});

export default rootReducer;