<<<<<<< HEAD:src/modules/index.js
import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import session from './session';
import messages from './messages';
import authorize from './authorize';

const rootReducer = combineReducers({
    counter,
    user,
    session,
    messages,
    authorize,
});

=======
import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import session from './session';
import messages from './messages';
import authorize from './authorize';

const rootReducer = combineReducers({
    counter,
    user,
    session,
    messages,
    authorize,
});

>>>>>>> 830d70bfff971e7384f9fd6074808854aa4bc247:src/reducers/index.js
export default rootReducer;