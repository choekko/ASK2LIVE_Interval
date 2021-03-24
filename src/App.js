import { NativeSelect } from '@material-ui/core';
import React from 'react';
import CounterContainer from './containers/CounterContainer';
import NavContainer from './containers/NavContainer'
import SessionCardContainer from './containers/SessionCardContainer';
// import MainPage from "./components/MainPage" 
// import 'fontsource-roboto'

import { Route, Switch } from 'react-router-dom'
import Auth from './hoc/auth'
import SessionMatchContainer from './containers/SessionMatchContainer';

import {LoginPage} from './components/onBoard'

const App = () => {
    return (
        <>
            {/* <Route exact path="/" component={MainPage}/> */}
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
