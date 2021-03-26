import React, { Component, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import { NavOfGuest, NavOfUser } from '../components/Nav';

/* async, await 사용하면 데이터는 가져와지나
Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
에러 발생
*/
const NavContainer = () => {
    const user = useSelector(state => state.user);
    console.log('user-------------NavContainer', user.data)

    if (user.data.detail){
        return <NavOfUser user={user}/>
    }else{
        return <NavOfGuest/>
    }
        
};

export default NavContainer

