import { NativeSelect } from '@material-ui/core';
import React, {useState} from 'react';
import CounterContainer from './containers/CounterContainer';
import NavContainer from './containers/NavContainer'
import SessionCardContainer from './containers/SessionCardContainer';
import 'fontsource-roboto'

import { Route, Switch, useHistory } from 'react-router-dom'
import Auth from './hoc/auth'
import SessionMatchContainer from './containers/SessionMatchContainer';

import {LoginPage} from './components/onBoard'

import Chat from "./components/liveSession/chatting/Chat"


const App = () => {

    //여기에서 유저정보를 받아야하나?

    const history = useHistory();

    return (
        <>
        <Route exact path="/hole/c9c9dd9bb" component={Chat}/>
        
        <Route exact path="/" component={SessionCardContainer}/>
        <Switch>
            <Route exact path="/login" component={LoginPage}/>
            {/* <Route exact path="/resister" component={Auth(ResisterPage, false)}/> */}
            <Route exact path="/session/:state" component={SessionMatchContainer}/> 
            <Route path="/" component={NavContainer}/>
        </Switch>
        </>

    )
};

export default App;
