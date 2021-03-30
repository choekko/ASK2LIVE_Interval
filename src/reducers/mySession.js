import {
  MY_SESSION_GET_PENDING,
  MY_SESSION_GET_SUCCESS,
  MY_SESSION_GET_FAILURE,
  MY_SETLIVE,
} from "../actions/types";

const initialState = {
  pending: false,
  error: false,
  data: [],
};

const mySession = (state = initialState, action) => {
  switch (action.type) {
    case MY_SESSION_GET_PENDING:
      return {
        ...state,
        pending: true,
        error: false,
      };
    case MY_SESSION_GET_SUCCESS:
      const sessionInfo = action.payload.data;
      return {
        ...state,
        pending: false,
        data: sessionInfo,
      };
    case MY_SESSION_GET_FAILURE:
      return {
        ...state,
        pending: false,
        error: true,
      };
    // case MY_SETLIVE:
    //   return {
    //     ...state[state.findIndex((e) => e.holeId === action.holeId)],
    //     isLive: action.livestate,
    //   };

    default:
      return state;
  }
};

export default mySession;
