import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';

import MyPage from '../components/mypage/Mypage'



const MyPageContainer = () => {

    return(
        <>
        <MyPage />
        </>
    )
};

export default MyPageContainer