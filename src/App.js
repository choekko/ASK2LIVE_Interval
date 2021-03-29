import { NativeSelect } from '@material-ui/core';
import React, {useEffect, useState, } from 'react';
import CounterContainer from './containers/CounterContainer';
import NavContainer from './containers/NavContainer'
import SessionCardContainer from './containers/SessionCardContainer';
import MypageContainer from './containers/MypageContainer';
import SessionCreateContainer from './containers/SessionCreateContainer';
import ProfileDetail from './components/mypage/ProfileDetail';
// import MainPage from "./components/MainPage" 
// import 'fontsource-roboto'

import { Route, Switch, useHistory } from 'react-router-dom'
import Auth from './hoc/auth'
import SessionMatchContainer from './containers/SessionMatchContainer';

import {LoginPage} from './components/onBoard'

import Chat from "./components/liveSession/chatting/Chat"

import { getUserInfo } from './actions/UserActions'
import { getSessionInfo } from './actions/SessionActions'
import { getAllUsersInfo } from './actions/AllUsersActions'
import { bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch} from 'react-redux';

const App = () => {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token')
    if(token){
        dispatch(getUserInfo(token));
    }

    dispatch(getSessionInfo());

    dispatch(getAllUsersInfo());


    return (
        <>
        {/* <Route exact path="/hole/c9c9dd9bb" component={Chat}/> */}
        
        <Route exact path="/" component={SessionCardContainer}/>
        <Switch>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/session/:state" component={SessionMatchContainer}/> 
            <Route exact path="/createSession" component={SessionCreateContainer}/>
            <Route path="/" component={NavContainer}/>
        </Switch>
        <Route exact path="/mypage" component={MypageContainer}/>
        <Route exact path="/mypage/:nickname" component={ProfileDetail}/>
        </>

    )
};

export default App
