import React, { Component, useCallback, useEffect, useState, forceUpdate } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import {MyLiveSessionsCards, OtherLiveSessionsCards, CurrentReserveSessionsCards} from '../components/sessionCard' 
// material-ui
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import {useHistory} from "react-router-dom"

import "../styles/style.css"

let myLiveSessions = []
let otherLiveSessions = []
let currentReserveSessions = []

const style = {
    title : {
        fontSize: "2em"
    }
}
    
const SessionCardContainer = () => {
    
    console.log(1)

    const user = useSelector(state => state.user);
    const sessions = useSelector(state => state.session.data);
    console.log(sessions)

    if(Object.keys(sessions).length != 0){

        console.log(2)
        let userDetail;
        if(user.data.detail){
            // console.log('SessionCard-user.pk', user.data.detail)
            userDetail = user.data.detail
        }else{
            userDetail = {pk:-1} // 반찬고 >_<
        }
        myLiveSessions = []
        otherLiveSessions = []
        currentReserveSessions = []

        console.log(sessions)
        sessions.map((session) => {
            console.log(session)
            if (session.status == "DOING" && (session.hole_reservations[0]).guests.indexOf(userDetail.pk) != -1) {
                myLiveSessions = [...myLiveSessions, session];
            }
            else if (session.status == "DOING") {
                otherLiveSessions = [...otherLiveSessions, session];
            }
            else {
                currentReserveSessions = [...currentReserveSessions, session];
            }
        })
    }


    return (
        <>
        {console.log(sessions)}
        {console.log(3)}
        <br></br>
        <div className="centered BMDOHYEON" style={style.title}>
            {/* <Typography variant="h3"  gutterBottom> */}
                ASK2LIVE
            {/* </Typography> */}
        </div>
        {/* <button onClick={()=>{
            history.push({
                pathname: "/hole/c9c9dd9bb",
                state: {
                    room : room,
                    windowHeight : "1000px",
                    onBack: setRoom(null),
                }
            })}
        }/> */}
    
        <Grid container direction="row" justify="center" alignItems="center">
            { myLiveSessions.length != 0 ? <MyLiveSessionsCards myLiveSessions={myLiveSessions} /> : <p>예약한 세션 중에 라이브중인게 없어요</p> }
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
    
        {/* <Grid container direction="row" justify="center" alignItems="center">
            { currentReserveSessions.length != 0 ? <CurrentReserveSessionsCards currentReserveSessions={currentReserveSessions}/> : <p>요청 받고있는 다른 세션이 없어요</p>}
        </Grid> */}
        </>

    
    )

        
        


};

export default SessionCardContainer
