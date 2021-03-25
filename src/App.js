import { NativeSelect } from '@material-ui/core';
import React, {useState} from 'react';
import CounterContainer from './containers/CounterContainer';
import NavContainer from './containers/NavContainer'
import SessionCardContainer from './containers/SessionCardContainer';
// import MainPage from "./components/MainPage" 
// import 'fontsource-roboto'

import { Route, Switch, useHistory } from 'react-router-dom'
import Auth from './hoc/auth'
import SessionMatchContainer from './containers/SessionMatchContainer';

import {LoginPage} from './components/onBoard'

import Chat from "./components/liveSession/chatting/Chat"


const App = () => {

    //?—¬ê¸°ì—?„œ ?œ ???? •ë³´ë?? ë°›ì•„?•¼?•˜?‚˜?

    const history = useHistory();

    return (
        <>
        <Route exact path="/hole/c9c9dd9bb" component={Chat}/>
        
        <Route exact path="/" component={SessionCardContainer}/>
        <Switch>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/session/:state" component={SessionMatchContainer}/> 
            <Route exact path="/" component={NavContainer}/>
        </Switch>
        </>

    )
};

export default App;
