import {sessionDummy} from "../dummydatas/sessionDummy"

const SETLIVE = 'session/setlive';

export const setLive = (given_roomId, given_livestate) => ({ type : SETLIVE, roomId: given_roomId,  livestate: given_livestate});  //  액션 생성함수

const initialState = sessionDummy;

const session = (state = initialState, action) => {
    switch (action.type) {
        case SETLIVE:
            return {
                ...state[state.findIndex(e => e.roomId === action.roomId)],
                isLive : action.livestate,
            };

        default:
            return state;
    }
}

export default session;