import { NativeSelect } from '@material-ui/core';
import React from 'react';
import CounterContainer from './containers/CounterContainer';
import NavContainer from './containers/NavContainer'
import SessionCardContainer from './containers/SessionCardContainer';
import 'fontsource-roboto'

import { Route, Switch } from 'react-router-dom'
import Auth from './hoc/auth'
import SessionMatchContainer from './containers/SessionMatchContainer';

import {LoginPage} from './components/onBoard'

const App = () => {
    return (
        <>
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
