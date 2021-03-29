import React, { Component, useCallback, useEffect, useState, forceUpdate } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import {MyLiveSessionsCards, OtherLiveSessionsCards, CurrentReserveSessionsCards} from '../components/sessionCard' 
// material-ui
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {useHistory, Link} from "react-router-dom"

import "../styles/style.css"
import { Description } from '@material-ui/icons';

let myLiveSessions = []
let otherLiveSessions = []
let currentReserveSessions = []

const style = {
    title : {
        color: "#030916",
        fontSize: "1.5em",
        paddingLeft : "1em"
    },
    mainOragne: {
        position : "absolute",
        backgroundColor: "#eb4e27",
        height : "15em",
        width: "100%",
        zIndex : "-1",
        overflow: "hidden",
    },
    descript: {
        fontSize: "1.2em",
        color: "white",
        paddingLeft: "1.2em"
    },
    cookie1: {
        backgroundImage: "url('/static/cookie.png')",
        top : "3em",
        right : "-2.5em",
    },
    cookie2: {
        backgroundImage: "url('/static/cookie.png')",
        top : "-1.5em",
        width: "2em",
        backgroundRepeat: "no-repeat",
        left : "60%",
    },
    button : {
        position: 'relative',
        width: '80%',
        marginBottom: '20px',
    },
    buttonIcon: {
        fontSize: 30,
        fontColor: 'black',
        backgroundColor: '#C0C0C0',
        borderRadius: '50%',
        marginLeft: '150%',
    },
    buttonText: {
        align: 'left',
        fontSize: '80%',
        margin: '8px',
        marginLeft: '-20%',
        fontWeight: 900,
    },
}

    
const SessionCardContainer = (props) => {
    const history = useHistory();
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
            if (session.status == "DOING" && session.hole_reservations.length != 0 && (session.hole_reservations[0]).guests.indexOf(userDetail.pk) != -1) {
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
        <button onClick={()=>{
            history.push({
                pathname: "/session/reserve",
                search: "?holeId=91",
                state : {
                    hostName : "오태양",
                    hostImage : "/static/logo192.png"
                }
            })
        }}>25hole ToLive</button>

        <div style={style.mainOragne}>
            <div style={style.cookie1} className="helloCookie"/>
            {/* <div style={style.cookie2} className="helloCookie"/> */}
        </div>
        <br></br>
        <div className="BMDOHYEON" style={style.title}>
            {/* <Typography variant="h3"  gutterBottom> */}
                ASK2LIVE
            {/* </Typography> */}
        </div>
        <br/><br/>
        <div style={style.descript} className="NotoSans2">
            찜했던<br/>
            Live Q&A가 시작했어요
        </div>
        <br/>
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
    <br></br>
        <Grid container justify="center">
        <Button
        style={style.button}
        variant="contained"
        color="default"
        endIcon={<AddIcon style={style.buttonIcon}/>}
        onClick={() => {history.push('/createSession')}}>
            <div style={style.buttonText} align="left">

                Live Q&A를 통해
                <br></br>
                경험을 함께 나누어보세요
            </div>
        </Button>
        </Grid>


        <Grid container direction="row" justify="center" alignItems="center">
            { myLiveSessions.length != 0 ? <MyLiveSessionsCards myLiveSessions={myLiveSessions} /> : <p>예약한 세션 중에 라이브중인게 없어요</p> }
        </Grid>
    
        <div className="center divider">
            <Divider variant="middle"/>
        </div>

        <Grid style={{paddingLeft : "6em", paddingRight : "6em"}} container direction="row" justify="center" alignItems="center">
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
