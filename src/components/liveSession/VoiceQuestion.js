import React, {useCallback, useState, useEffect} from "react";
import Avatar from "../Avatar"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core/styles"
import "../../styles/style.css"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent:"center",
        '& > *': {
          margin: theme.spacing(0),
        },
      },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },

  }));   

const VoiceQuestion = (props) => {
    console.log("무야호", props)
    const classes = useStyles();
    const [click, setClick] = useState(false)
    const [clickStyle, setClickStyle] = useState({zIndex:"1", backgroundColor:"#63BF8B"})

    const sendP2PMessage = useCallback((recipientUID, peerMsg) => {
        console.log("sendP2PMessage");
    
        // An RtmMessage object.
        const remoteUID = String(recipientUID);
    

        // p2p message
        console.log("리모트 UID: ", remoteUID);
        console.log("리모트 msg: ", peerMsg);
    
        if (peerMsg) {
          (props.rtmClient)
            .sendMessageToPeer({ text: peerMsg }, remoteUID)
            .then((sendResult) => {
              if (sendResult.hasPeerReceived) {
                console.log("peer recieved " + peerMsg + " successfully");

              } else {
                console.log("peer did not recieved " + peerMsg + " unlog");
              }
            })
            .catch((error) => {
              console.log("RTM message recieved err");
            });
        }
      }, []);

    return (
        <>
        <div style={{position:"absolute", width:"100%", display:"flex", justifyContent:"center", top:"0"}}>
            <div>
                <div className={classes.root}>
                    <Avatar alt={props.userNickName} src={props.imageLink} className={classes.large}/>
                </div>
                <div className={classes.root}>
                 <p style={{color:"rgba(255,255,255,0.6)"}}>{props.userNickName}</p>
                </div>
                <div className={classes.root}>
                {props.isHost?
                <>
                <button
                disabled={click}
                style={clickStyle}
                onClick={()=>{setClickStyle({zIndex:"1", backgroundColor:"grey"});setClick(true); sendP2PMessage(props.userUid, "host")}}
                >
                    <span style={{color:"black"}} className="BMJUA">연결</span>
                </button>
                <button
                style={{zIndex:"1",backgroundColor:"white"}}
                onClick={()=>{
                    sendP2PMessage(props.userUid, "audience")
                    props.onAnswered(props.currentQuestionId)
                    setTimeout(() => {
                        setClick(false);
                        setClickStyle({zIndex:"1", backgroundColor:"#63BF8B"});
                    }, 4000);
                }}
                >
                <span style={{color:"black"}} className="BMJUA">다음</span>
                </button>
                </>
                :
                <>
                </>
                }
                </div>
            </div>
        </div>
        <div className="voiceCircle"/> 
        </>
    )

}

export default VoiceQuestion;