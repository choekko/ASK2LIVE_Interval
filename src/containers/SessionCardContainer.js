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

// 서버에서 세션 데이터 받아오기
const getSessions = () => {
    const res = axios.get('https://143.248.226.51:8000/api/hole').then(
        response => response.data)
        return res;
    
    console.log(res)
}

const style = {
    title : {
        fontSize: "2em"
    }
}
    
const SessionCardContainer = () => {

    // const [room, setRoom] = useState({});
    // const history = useHistory();

    const [load, setLoad] = useState(0);
    const sessions = getSessions()
    //-------DEBUG---------
    // console.log('sessions', sessions)
    // sessions.map((session) => {
    //     console.log(session)
    // })
    const user = useSelector(state => state.user, []);
    
    let userDetail;
    if(user.data.detail){
        console.log('SessionCard-user.pk', user.data.detail)
        userDetail = user.data.detail
    }else{
        userDetail = {pk:-1} // 반찬고 >_<
    }
    
    
    useEffect(()=>{
        myLiveSessions = []
        otherLiveSessions = []
        currentReserveSessions = []

        sessions.then((e) => (e.map((session) => {
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
        }))).then(()=>{console.log("무야야야야"); if (load < 11) {setLoad(load + 1)}})
    }, [sessions, user])


    return (
        
        load ? 
        <>
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

        {/* <Grid container direction="row" justify="center" alignItems="center">
            { currentReserveSessions.length != 0 ? <CurrentReserveSessionsCards currentReserveSessions={currentReserveSessions}/> : <p>요청 받고있는 다른 세션이 없어요</p>}
        </Grid> */}
        </>
        : <></>
    )


};

export default SessionCardContainer
