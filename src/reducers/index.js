import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import session from './session';
import messages from './messages';
import authorize from './authorize';
import questionlist from './questionlist';
import allUsers from './allUsers';

const rootReducer = combineReducers({
    counter,
    user,
    allUsers,
    session,
    messages,
    authorize,
    questionlist,
});

export default rootReducer;