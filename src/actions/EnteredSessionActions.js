import {
    ENTEREDSESSION_GET_PENDING,
    ENTEREDSESSION_GET_SUCCESS,
    ENTEREDSESSION_GET_ERROR
} from './types';

import axios from 'axios'

function getApi(channelNum){
    return axios.get('https://143.248.226.51:8000/api/hole/live/read/' + channelNum);
}

const getEnteredSession = channelNum => dispatch => {
    console.log('-----getEnteredSession-----')
    dispatch({type: ENTEREDSESSION_GET_PENDING}); // 요청이 시작되었다는 것을 알림

    // 요청 시작
    return getApi(channelNum).then(
        (response) => {
            console.log(response);
            dispatch({ type: ENTEREDSESSION_GET_SUCCESS, payload: response });
        }
    ).catch(error => {
        dispatch({ type: ENTEREDSESSION_GET_ERROR, payload: error });
    })
}

export default getEnteredSession;