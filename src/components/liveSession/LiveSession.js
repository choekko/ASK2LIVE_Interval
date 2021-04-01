import React, {useState, useEffect, useRef, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from "react-router-dom"
import axios from "axios"
import getEnteredSession from "../../actions/EnteredSessionActions"
import getQuestionList from "../../actions/QuestionListActions";

import ParticipantList from "./ParticipantList";
import CurrentQuestion from "./CurrentQuestion";


import QuestionSwiper from "./QuestionSwiper";
import QuestionList from "./QuestionList";
import Questioning from "./Questioning";
import InsertField from "./InsertField";
import Chat from "./chatting/Chat";
import Question from "./Question";
import Avatar from "../Avatar";
import "../../index.css"

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseListButton from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import "../../styles/style.css"


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
        backgroundColor: "#2F3041",
    },

    session_top: {
        position: "relative",
        minHeight: "3em",
        height: "5%",
        width: "100%",
    },
    
    
    session_mid: {
        position: "relative",
        height: "55%",
        width: "100%",
    },
    
    session_bottom: {
        position: "relative",
        borderRadius: "30px 30px 0px 0px",
        bottom: "0%",
        height: " 40%",
        width: "100%",
        backgroundColor: "#20202C",
        zIndex:"0",
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
        color: "rgba(255,255,255,0.8)"
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

    listbutton : {
        position: "absolute",
        top: "-0.5em",
    }
   
}

//^ =============================================================
const appid = "2e5346b36d1f40b1bbc62472116d96de";
const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
const rtmClient = AgoraRTM.createInstance(appid);

//^ =============================================================

const LiveSession = (props) => {
    const history = useHistory();
    console.log("!!!!!!!!!!!!!!!!!", props);
    // console.log("history state: ", history.state)
    // history.pushState(null, null, '');
    // console.log("history state: ", history.state)
    const dispatch = useDispatch()


    const hostPostApi = async(hostUid) =>  {
        const headers = {
            'Authorization': 'Token ' + localStorage.token
          }
          const data = {
              channel_num : props.channelNum,
              host_uid : hostUid,
          };
          console.log("LiveSession Host Post :", data);
          const res = await axios.post(
            "https://143.248.226.51:8000/api/hole/"+props.holeId+"/live/create",
            data,
            {headers:headers}
          );
          console.log(res.data);
    }
    
    const audiencePutApi = async(audienceUid) =>  {
        const headers = {
            'Authorization': 'Token ' + localStorage.token
          }
          const data = {
              uid : audienceUid,
          };
          console.log("LiveSession Audience Post :", data);
          const res = await axios.put(
            "https://143.248.226.51:8000/api/hole/"+props.holeId+"/live/join/"+props.channelNum,
            data,
            {headers:headers}
          );
          console.log(res.data);
    }

    const leavePatchApi = async() =>  {
        const headers = {
            'Authorization': 'Token ' + localStorage.token
          }
          const data = {};
          const res = await axios.patch(
            "https://143.248.226.51:8000/api/hole/"+props.holeId+"/live/leave/"+props.channelNum,
            data,
            {headers:headers}
          );
          console.log(res.data);
    }


    const [listup, setListUp] = useState({transform : "translate(0, 100%)"})
    const [queUp, setQueUp] = useState({transform : "translate(0, 100%)"})
    const [userUp, setUserUp] = useState({transform : "translate(0, 100%)"})
    const [dark, setDark] = useState({display:"none"})

    const [room, setRoom] = useState({});
    // const history = useHistory()
    
    let partiNum = "로딩중";
    const holeInfo = useSelector(state => state.enteredSession, [partiNum])
    const hostImage = holeInfo.arrived ? 
            holeInfo.data.detail.livehole.host_profile_image_url
            : "/static/live_png";
    partiNum = holeInfo.arrived ? 
         holeInfo.data.detail.participant.length + "명"
        : "로딩중"


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
        const liveInter = setInterval(()=>{
            dispatch(getEnteredSession(props.channelNum))
            dispatch(getQuestionList(props.holeId))
        }, 5000);
        rtmChannel = rtmClient.createChannel(props.channelNum);
        join(props.channelNum, null, rtmClient, rtmChannel, props.isHost);
        rtmChannel.on('ChannelMessage', (message, memberId) => {
            // Your code.
            console.log(`Message ${message}, from ${memberId}`);
            rtmClient.logout();
            leave();
            leavePatchApi();
            clearInterval(liveInter);
            history.replace('/main');
        });
        if (props.isHost)
            setTimeout(()=>{hostPostApi(client.uid)}, 2000);
        else
            setTimeout(()=>{audiencePutApi(client.uid)}, 2000);
        const unblock = history.block('정말 떠나시겠습니까?');
        return () => {
            console.log("호스트여부: ", props.isHost)
            if (props.isHost) {
                rtmChannel.sendMessage({ text: "hostOut" }).then(() => {
                // Your code for handling the event when the channel message is successfully sent.
                    console.log('host is leaving')
                }).catch(error => {
                // Your code for handling the event when the channel message fails to be sent.
                    console.log('host leaving error')
                });
            }
            rtmClient.logout();
            leave();
            leavePatchApi();
            clearInterval(liveInter)
            unblock();
            // history.replace('/main');
            // window.location.reload('/main');
        }
    }, [history])

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
                            <td  colspan="2" className="NanumGothic4" style={style.td1} >{props.holeTitle}</td>
                            <td  rowspan="2">
                                <div style={style.follow}>
                                    <CloseIcon
                                    onClick={()=>{history.push('/')}}
                                    />  
                                </div>
                            </td>      
                        </tr>
                        <tr>
                            <td style={style.td2}>
                                <img className="live_img" src="/static/live.png"/>
                            </td>
                            <td style={{color:"rgba(255, 255, 255, 0.6)"}}className="NotoSans3">{partiNum}</td>
                        </tr>

                    </table>  
                </div>
                <div style={style.session_mid}>
                    <div style={{position:"relative", height:"40%"}}>
                        <div className="horizentalmid" >
                            <div className="verticalmid">
                                <tr>
                                <StyledBadge badgeContent={<FavoriteBorder style={style.checkIcon}/>} color="error">
                                    <Avatar hostName={props.hostName} imageLink={props.hostImage}/>
                                </StyledBadge>
                                </tr>
                                <tr className="centered">
                                    <span style={{color: "rgba(255,255,255,0.8)"}}className="BMDOHYEON">{props.hostName}</span>
                                </tr>
                            </div>
                        </div>
                    </div>
                    <div style={{position:"relative", height:"50%", display:"flex", alignItems: "center"}}>
                        {/* <Grid container justify="center"> */}
                            <div>
                                 <CurrentQuestion 
                                 holeId={props.holeId} 
                                 isHost={props.isHost}
                                 client={client}
                                 rtmClient={rtmClient}
                                 host={authority}
                                 localAudioTrack={localAudioTrack}
                                 remoteUsers={remoteUsers}
                                 channelNum={props.channelNum}
                                 />
                            </div>
                        {/* </Grid>  */}
                    </div>

                </div>
                <div style={style.session_bottom}>
                    <div className="chattingWrapper"/>
                    <Chat holeId={props.holeId} isHost={props.isHost} channelNum={props.channelNum} goQueUp={setQueUp} goListUp = {setListUp} goUserUp = {setUserUp} goDark={setDark} room={room} windowHeight="1000px" onBack={()=>setRoom(null)}/>                   
                </div>
            
           
        </div>
        {props.isHost?
        <div style={userUp} className="hiddenlist">
            <ParticipantList holeId={props.holeId} channelNum={props.channelNum} goUserUp = {setUserUp} goDark={setDark}/>
            <IconButton style={style.listbutton} onClick={()=>{setUserUp({transform : "translate(0, 100%)"}); setDark({opacity: "0", animation: "golight 0.7s"}); setTimeout(()=>{setDark({display: "none"})}, 700)}} aria-label="question_list">
                <CloseListButton fontSize="large"/>
            </IconButton>
        </div>
        :   
        <div style={queUp} className="hiddenQue">
            <p style={{color: "rgba(0,0,0,0.7)", fontSize: "1em", position:"absolute", left:"5%", bottom:"6em", zIndex:"1"}}
            className="BMDOHYEON"
            > 질문을 등록하고 호스트와 대화하세요!</p>
            <Questioning holeId={props.holeId} goQueUp = {setQueUp} goDark={setDark}/>
        </div>
        }
        <div style={listup} className="hiddenlist">
            <QuestionList holeId={props.channelNum} goListUp = {setListUp} goDark={setDark}/>
            <IconButton style={style.listbutton} onClick={()=>{setListUp({transform : "translate(0, 100%)"}); setDark({opacity: "0", animation: "golight 0.7s"}); setTimeout(()=>{setDark({display: "none"})}, 700)}} aria-label="question_list">
                <CloseListButton fontSize="large"/>
            </IconButton>
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