import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {MyLiveSessionsCards, OtherLiveSessionsCards, CurrentReserveSessionsCards, HostConfirmedSessionsCards} from '../components/sessionCard' 
import {SessioinCreateButton} from '../components/SessionCreateButton';
import HostCards from '../components/HostCards';
// material-ui
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom"

import "../styles/style.css"
import "../App.css"

let myLiveSessions = []
let otherLiveSessions = []
let currentReserveSessions = []
let hosts = []
let hostConfirmedSessions = []

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
    descript2: {
        fontSize: "1.2em",
        color: "#1C418C",
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
    const [flag, setFlag] = useState(false);

    const user = useSelector(state => state.user);
    const sessions = useSelector(state => state.session.data);
    const history = useHistory();
    const allUsersData = useSelector(state => state.allUsers);
    const mySession = useSelector(state => state.mySession.data);
    // console.log('allUsers.data.data.detail', allUsersData.data.data.detail);
    

    if(Object.keys(sessions).length != 0){
        let userDetail;
        if(user.data.detail){
            userDetail = user.data.detail
        }else{
            userDetail = {id:-1} // 반찬고 >_<
        }
        myLiveSessions = []
        otherLiveSessions = []
        currentReserveSessions = []
        hostConfirmedSessions = []
        hosts = []

        sessions.map((session) => {
            console.log(session)
            if (session.status == "DOING" && session.hole_reservations && (session.hole_reservations).guests.indexOf(userDetail.id) != -1) {
                myLiveSessions = [...myLiveSessions, session];
                console.log("myLiveSEssion:",myLiveSessions)
            }
            else if (session.status == "DOING") {
                otherLiveSessions = [...otherLiveSessions, session];
                console.log("otherLiveSessions",otherLiveSessions)
            }
            else if (session.hole_reservations && session.hole_reservations.status=="HOST_CONFIRMED"){
                hostConfirmedSessions = [...hostConfirmedSessions, session];
                console.log("hostConfirmedSessions",hostConfirmedSessions)
            }else{
                currentReserveSessions = [...currentReserveSessions, session];
                console.log("currentReserveSessions",currentReserveSessions)
            }
        })
    }

    if(Object.keys(allUsersData.data).length != 0){
        const allUsers = allUsersData.data.data.detail;
        allUsers.map((candidate) => {
            if(candidate.hole_open_auth === true){
                hosts = [...hosts, candidate]
            }
        })
    }


    return (
        <>
        <div style={style.mainOragne}>
            <div style={style.cookie1} className="helloCookie"/>
        </div>
        <br></br>
        <div className="BMDOHYEON" style={style.title}>
                ASK2LIVE
        </div>
        <br/><br/>
        
            {
                myLiveSessions.length == 0 ?
                <div style={style.descript} className="NotoSans2">
                다양한 사람들에게<br/>
                궁금한 것들을 물어보세요!
                </div>
                :
                <div style={style.descript} className="NotoSans2">
                찜했던<br/>
                Live Q&A가 시작했어요!
                </div>
            } 
        
        <br/>

    <br></br>
        <SessioinCreateButton/>


        <Grid container direction="row" justify="center" alignItems="center">
            { myLiveSessions.length != 0 ?
            <> 
            <MyLiveSessionsCards myLiveSessions={myLiveSessions} />
            <div className="center divider">
              <Divider variant="middle"/>
            </div>
            </>
            : <></>
            }
        </Grid>

        <p style={style.descript2} className="Gmarket2">LIVE 중인 다른 Q&A</p>
        <Grid style={{paddingLeft : "6em", paddingRight : "6em"}} container direction="row" justify="center" alignItems="center">
            { otherLiveSessions.length != 0 ? <OtherLiveSessionsCards otherLiveSessions={otherLiveSessions}/> : <p>라이브 중인 다른 세션이 없어요</p> }
        </Grid>
    
        <div className="center divider">
            <Divider variant="middle"/>
        </div>

        <p style={style.descript2} className="Gmarket2">다가오는 LIVE Q&A</p>
        <Grid style={{paddingLeft : "6em", paddingRight : "6em"}} container direction="row" justify="center" alignItems="center">
            { hostConfirmedSessions.length != 0 ? <HostConfirmedSessionsCards hostConfirmedSessions={hostConfirmedSessions}/> : <p>예정된 다른 세션이 없어요</p> }
        </Grid>

        <div className="center divider">
            <Divider variant="middle"/>
        </div>

        <p style={style.descript2} className="Gmarket2">오픈 신청중인 LIVE Q&A</p>
        <Grid style={{paddingLeft : "6em", paddingRight : "6em"}} container direction="row" justify="center" alignItems="center">
            { currentReserveSessions.length != 0 ? <CurrentReserveSessionsCards currentReserveSessions={currentReserveSessions} setFlag={setFlag}/> : <p>요청 받고있는 다른 세션이 없어요</p>}
        </Grid>

        <div className="center divider">
            <Divider variant="middle"/>
        </div>

        {/* 
        <Grid style={{paddingLeft : "6em", paddingRight : "6em"}} container direction="row" justify="center" alignItems="center">
            { hosts.length != 0 ? <HostCards hosts={hosts}/> : <p>등록된 호스트가 없어요</p>}
        </Grid> */}
    
        </>

    
    )
};

export default SessionCardContainer
