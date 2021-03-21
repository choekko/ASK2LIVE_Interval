import React, { Component, useCallback, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';

import {MyLiveSessionsCards, OtherLiveSessionsCards, CurrentReserveSessionsCards} from '../components/sessionCard' 


import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

let myLiveSessions = []
let otherLiveSessions = []
let currentReserveSessions = []


const SessionCardContainer = () => {
    console.log("Enter : SessionCardContainer")
    const sessions = useSelector(state => state.session, []);
    console.log(sessions);
    const user = useSelector(state => state.user, []);

    useEffect(()=>{
        myLiveSessions = []
        otherLiveSessions = []
        currentReserveSessions = []
        sessions.map((session) => {
            if (session.isLive && session.reserveUsers.indexOf(user.userNickName) != -1) {
                myLiveSessions = [...myLiveSessions, session];
            }
            else if (session.isLive) {
                otherLiveSessions = [...otherLiveSessions, session];
                console.log(2);
            }
            else {
                currentReserveSessions = [...currentReserveSessions, session];
            }
        })
    }, [sessions, user])

    return (
        <>
        <Grid container direction="row" justify="center" alignItems="center">
            { myLiveSessions.length != 0 ? <MyLiveSessionsCards myLiveSessions={myLiveSessions}/> : <p>예약한 세션 중에 라이브중인게 없어요</p> }
        </Grid>
        
        <div className="center divider">
         <Divider variant="middle"/>
        </div>

        <Grid container direction="row" justify="center" alignItems="center">
            { otherLiveSessions.length != 0 ? <OtherLiveSessionsCards otherLiveSessions={otherLiveSessions}/> : <p>라이브 중인 다른 세션이 없어요</p> }
        </Grid>

        <div className="center divider">
         <Divider variant="middle"/>
        </div>

        <Grid container direction="row" justify="center" alignItems="center">
            { currentReserveSessions.length != 0 ? <CurrentReserveSessionsCards currentReserveSessions={currentReserveSessions}/> : <p>요청 받고있는 다른 세션이 없어요</p>}
        </Grid>
        </>
    )

};

export default SessionCardContainer
