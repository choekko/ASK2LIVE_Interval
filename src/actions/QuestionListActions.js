import {
    QUESTIONLIST_GET_PENDING,
    QUESTIONLIST_GET_SUCCESS,
    QUESTIONLIST_GET_ERROR
} from './types';

import axios from 'axios'

function getApi(holeId){
    return axios.get('https://143.248.226.51:8000/api/hole/' + holeId + '/questions');
}

const getQuestionlist = holeId => dispatch => {
    console.log('-----getQuestionlist-----')
    dispatch({type: QUESTIONLIST_GET_PENDING}); // 요청이 시작되었다는 것을 알림

    // 요청 시작
    return getApi(holeId).then(
        (response) => {
            console.log(response);
            dispatch({ type: QUESTIONLIST_GET_SUCCESS, payload: response });
        }
    ).catch(error => {
        dispatch({ type: QUESTIONLIST_GET_ERROR, payload: error });
    })
}

export default getQuestionlist;
