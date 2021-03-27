import { SportsTennis } from '@material-ui/icons';

import {
    USER_GET_PENDING,
    USER_GET_SUCCESS,
    USER_GET_FAILURE,
    GIVEUSER
  } from '../actions/types';

// function userGetApi(token){
//     const config = {
//                 headers: { Authorization: 'Token ' + token }
//             }
//     return axios.get('https://143.248.226.51:8000/api/user/read', config)
// }

// const USER_GET_PENDING = 'USER_GET_PENDING';
// const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
// const USER_GET_FAILURE = 'USER_GET_FAILURE';
// const GIVEUSER = 'user/GIVEUSER';


// export const giveUser = (given) => ({ type : GIVEUSER, user : given });

// export const getUserInfo = (token) => dispatch => {
//     dispatch({type: USER_GET_PENDING}); // 요청이 시작되었다는 것을 알림

//     // 요청 시작
//     return userGetApi(token).then(
//         (response) => {
//             dispatch({ type: USER_GET_SUCCESS, payload: response });
//         }
//     ).catch(error => {
//         dispatch({ type: USER_GET_FAILURE, payload: error });
//     })
// }

// GET : 유저 정보 요청
// const getUserInfo = async({token}) => {
//     const config = {
//         headers: { Authorization: 'Token ' + token }
//     }
//     const res = await axios.get('https://143.248.226.51:8000/api/user/read', config)
//     console.log('getUserInfo res.data', res.data)
//     return res.data.detail
// }

// const token = localStorage.getItem('token')
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