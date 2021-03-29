import { NativeSelect } from '@material-ui/core';
import React, {useEffect, useState, } from 'react';
import CounterContainer from './containers/CounterContainer';
import NavContainer from './containers/NavContainer'
import SessionCardContainer from './containers/SessionCardContainer';
import MypageContainer from './containers/MypageContainer';
import SessionCreateContainer from './containers/SessionCreateContainer';
// import MainPage from "./components/MainPage" 
// import 'fontsource-roboto'

import { Route, Switch, useHistory } from 'react-router-dom'
import Auth from './hoc/auth'
import SessionMatchContainer from './containers/SessionMatchContainer';

import {LoginPage} from './components/onBoard'

import Chat from "./components/liveSession/chatting/Chat"

import { getUserInfo } from './actions/UserActions'
import { getSessionInfo } from './actions/SessionActions'
import { bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch} from 'react-redux';

const App = () => {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token')
    // console.log('App token', token)
    if(token){
        dispatch(getUserInfo(token));
    }

    dispatch(getSessionInfo());


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
        <Route exact path="/myPage" component={MypageContainer}/>
        </>

    )
};

const mapStateToProps = state => {
    const { loading } = state.user.pending;
    const { error } = state.user.error;
    const { userInfo } = state.user.data;
    return { loading, error, userInfo };
  }

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ getUserInfo, getSessionInfo }, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
