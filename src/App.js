import { NativeSelect } from '@material-ui/core';
import React, {useEffect, useState, } from 'react';
import CounterContainer from './containers/CounterContainer';
import NavContainer from './containers/NavContainer'
import SessionCardContainer from './containers/SessionCardContainer';
import MypageContainer from './containers/MypageContainer';
import SessionCreateContainer from './containers/SessionCreateContainer';
import ProfileDetail from './components/mypage/ProfileDetail';
import MypageEdit from './components/mypage/MypageEdit';
import MySessionEdit from './components/mypage/MySessionEdit'
import PreQuestions from './components/sessionCard/PreQuestions';
// import MainPage from "./components/MainPage" 
// import 'fontsource-roboto'

import { Route, Switch, useHistory } from 'react-router-dom'
import Auth from './hoc/auth'
import SessionMatchContainer from './containers/SessionMatchContainer';

import {LoginPage} from './components/onBoard'

import { connect, useSelector, useDispatch} from 'react-redux';
import Chat from "./components/liveSession/chatting/Chat"

import { getAllUsersInfo } from './actions/AllUsersActions'
import { getSessionInfo } from './actions/SessionActions'
import { getUserInfo } from './actions/UserActions'
import { bindActionCreators } from 'redux';

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
            {/* <Route exact path="/session/:state" render={(matchProps) => <SessionMatchContainer {...matchProps}/>}/>  */}
            <Route exact path="/createSession" component={SessionCreateContainer}/>
            <Route path="/" component={NavContainer}/>
        </Switch>
        <Route exact path="/preQuestions/:pk" component={PreQuestions}/>    
        <Route exact path="/mypage" component={MypageContainer}/>
        <Route exact path="/mypage/:nickname" component={ProfileDetail}/>
        <Route exact path="/mypage/:nickname/edit" component={MypageEdit}/>
        <Route exact path="/mypage/hole/:session/edit" component={MySessionEdit}/>
        </>

    )
};

export default App
