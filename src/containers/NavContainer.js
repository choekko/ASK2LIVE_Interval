import React, { Component, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import { NavOfGuest, NavOfUser } from '../components/Nav';


const NavContainer = () => { 
    const user = useSelector(state => state.user, []);
    if (!user.userId)
        return <NavOfGuest/>
    else
        return <NavOfUser user={user}/>
};

export default NavContainer

