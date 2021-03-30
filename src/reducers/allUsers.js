import { 
    ALL_USERS_GET_PENDING,
    ALL_USERS_GET_SUCCESS,
    ALL_USERS_GET_FAILURE 
} from "../actions/types";

const initialState = {
    pending: false,
    error: false,
    data: {}
}

// Reducer
const allUsers = (state = initialState, action) => {
    switch (action.type) {
        case ALL_USERS_GET_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            };
        case ALL_USERS_GET_SUCCESS:
            const allUserInfo = action.payload; // 경로 수정 필요할수도
            return {
                ...state,
                pending: false,
                data: allUserInfo
            };
        case ALL_USERS_GET_FAILURE:
            return {
                ...state,
                pending: false,
                error: true
            }
        default:
            return state;
    }
}

export default allUsers;