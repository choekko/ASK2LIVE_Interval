import {
    SESSION_GET_PENDING,
    SESSION_GET_SUCCESS,
    SESSION_GET_FAILURE,
    SETLIVE
  } from './types';

import axios from 'axios'

export const setLive = (given_roomId, given_livestate) => ({ type : SETLIVE, roomId: given_roomId,  livestate: given_livestate});  //

function sessionGetApi(){
    return axios.get('https://143.248.226.51:8000/api/hole')
}

export const getSessionInfo = () => dispatch => {
    console.log('-----getSessionInfo start-----')
    dispatch({type: SESSION_GET_PENDING}); // 요청이 시작되었다는 것을 알림

    // 요청 시작
    return sessionGetApi().then(
        (response) => {
            dispatch({ type: SESSION_GET_SUCCESS, payload: response });
        }
    ).catch(error => {
        dispatch({ type: SESSION_GET_FAILURE, payload: error });
    })
}

