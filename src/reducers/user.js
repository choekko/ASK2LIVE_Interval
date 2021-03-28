
import {
    USER_GET_PENDING,
    USER_GET_SUCCESS,
    USER_GET_FAILURE,
    GIVEUSER
  } from '../actions/types';


const initialState = {
    pending: false,
    error: false,
    data: {}
}

// Reducer
const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            };
        case USER_GET_SUCCESS:
            const userInfo = action.payload.data; // 경로 수정 필요할수도
            return {
                ...state,
                pending: false,
                data: userInfo
            };
        case USER_GET_FAILURE:
            return {
                ...state,
                pending: false,
                error: true
            }
        // case GIVEUSER:
        //     // state = action.user; //state 이렇게 바꿔도 되나?
        //     return state;
        default:
            return state;
    }
}

export default user;