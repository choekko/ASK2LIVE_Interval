import React, {useState, useEffect, useRef, useCallback} from 'react'
import { useDispatch } from 'react-redux';
import { useHistory} from "react-router-dom"

import Chat from "./chatting/Chat"

import "../../styles/style.css"
import "../../index.css"
import InsertField from "./InsertField"
import Avatar from "../Avatar";
import Question from "./Question"
import QuestionSwiper from "./QuestionSwiper"
import QuestionList from "./QuestionList"
import Questioning from "./Questioning"

import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';


import { Autocomplete } from '@material-ui/lab';
import { CenterFocusStrong, FilterNone, NoEncryption } from '@material-ui/icons';

//^ =============================================================
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";
import useAgora from "./agora/useAgora";
import PlayerWrapper from "./agora/PlayerWrapper";
//^ =============================================================

const StyledBadge = withStyles((theme) => ({
    badge: {
        marginRight: theme.spacing(3),
        width: 30,
        height: 30,
      top: 13,
      borderRadius: "20px",
      border: `3px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

const style = {
    livewrapper: {
        display: "inline-block",
        width: "100%",
        position: "fixed",
        height: "100%",
        // backgroundColor: "rgb(255, 239, 196)"
    },

    livesession: {
        position:"absolute",
        maxWidth: "45em",
        minHeight: "35em",
        width: "100%",
        height: "100%",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
        // backgroundColor: "rgb(139, 139, 139)",
    },

    session_top: {
        position: "relative",
        minHeight: "3em",
        height: "5%",
        width: "100%",
    },
    
    
    session_mid: {
        position: "relative",
        height: "30%",
        width: "100%",
    },
    
    session_bottom: {
        position: "relative",
        borderRadius: "30px 30px 0px 0px",
        bottom: "0%",
        height: " 65%",
        width: "100%",
        backgroundColor: "#dfd2df"
        // backgroundColor: "rgb(255, 248, 225)"
    },
    table: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    td1: {
        width: "60%",
        fontSize: "1em",
        padding: "10px 0 0 10px",
    },

    td2: {
        width: "5%",
        padding: "0 0 0 10px",
    },
    lavel : {
        marginLeft: "-12px",
        marginRight: "-0.7em",
    },
    font_size : {
        fontSize : "1rem"
    },
    checkIcon : {
        height: "0.6em"
    },

    tablecell: {
        display: "table-cell",
        verticalAlign: "middle",
        height: "100%",
    },
    follow: {
        marginRight: "3px",
        float: "right",
    },

    question: {
        width : "90%",
    },


}

//^ =============================================================
const appid = "2e5346b36d1f40b1bbc62472116d96de";
const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
const rtmClient = AgoraRTM.createInstance(appid);

//^ =============================================================

const LiveSession = (props) => {

    const [listup, setListUp] = useState({transform : "translate(0, 100%)"})
    const [queUp, setQueUp] = useState({transform : "translate(0, 100%)"})
    const [dark, setDark] = useState({display:"none"})

    const [room, setRoom] = useState({});
    const history = useHistory()


    //^ =============================================================
    let rtmChannel;
    const [channel, setChannel] = useState();

    const {
        localAudioTrack,
        leave,
        join,
        joinState,
        remoteUsers,
        authority,
    } = useAgora(client);

    useEffect(() => {
        rtmChannel = rtmClient.createChannel(props.channelNum);
        join(props.channelNum, null, rtmClient, rtmChannel);
        return () => {
            rtmClient.logout();
            leave();
        }
    }, [])

    const onClick = (choice) => () => {
        if (choice === "join") {
          console.log("join");
          console.log(props.channelNum);
          rtmChannel = rtmClient.createChannel(props.channelNum);
          
          join(props.channelNum, null, rtmClient, rtmChannel);
        } else if (choice === "leave") {
          console.log("leave");
          rtmClient.logout();
          leave();
        }
    };

    // ^ =============================================================

    return (
        <>
        <div style={style.livewrapper}>
            <div style={style.livesession}>
                <div style={style.session_top}>
                    <table style={style.table}>
                        <tr>
                            <td  colspan="2" className="NanumGothic4" style={style.td1} >QNA 타이틀 영역입니다다다다다</td>
                            <td  rowspan="2">
                                <div style={style.follow}>

                                     <FormControlLabel style={style.lavel}
                                    control={<Checkbox icon={<FavoriteBorder style={style.checkIcon}/>} checkedIcon={<Favorite style={style.checkIcon}/>} name="checkedH" />}
                                    />
                                    <span style={style.font_size} className="BMDOHYEON">FOLLOW</span>
                                                            
                                </div>
                            </td>      
                        </tr>
                        <tr>
                            <td style={style.td2}>
                                <img className="live_img" src="/static/live.png"/>
                            </td>
                            <td className="NotoSans3">24명</td>
                        </tr>

                    </table>
                    
                </div>
                <div style={style.session_mid}>
                    <div className="horizentalmid" >
                        <div className="verticalmid">
                            <tr>
                            <StyledBadge badgeContent={<FavoriteBorder style={style.checkIcon}/>} color="error">
                                <Avatar hostName={props.hostName} imageLink={props.imageLink} size="large"/>
                            </StyledBadge>
                            </tr>
                            <tr className="centered">
                                <span className="BMDOHYEON">{props.hostName}</span>
                            </tr>
                        </div>
                    </div>
                </div>
                <div style={style.session_bottom}>
                    <Grid container justify="center">
                        <QuestionSwiper/>
                    </Grid>

                    <div className="forchat"></div> 
                    <Chat roomId={props.channelNum} goQueUp={setQueUp} goListUp = {setListUp} goDark={setDark} room={room} windowHeight="1000px" onBack={()=>setRoom(null)}/>
                    <div className="chattingblind"></div>
                    
                </div>
            
        </div>
        <div style={listup} className="hiddenlist">
            <QuestionList holeId={props.channelNum} goListUp = {setListUp} goDark={setDark}/>
        </div>
        <div style={queUp} className="hiddenQue">
            <Questioning goQueUp = {setQueUp} goDark={setDark}/>
        </div>
        <div style={dark} className="layerfordark"></div>
        {/* <div className="agora"> */}
                

        <div className="host-player">
            {client.uid}
            <PlayerWrapper
                client={client}
                rtmClient={rtmClient}
                host={authority}
                localAudioTrack={localAudioTrack}
                remoteUsers={remoteUsers}
                channelNum={props.channelNum}
            />
        </div>
        </div>
        </>
    )

}

export default LiveSession