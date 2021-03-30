import React, {useCallback} from "react";
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
                // client.unpublish([localAudioTrack, localVideoTrack]);
                // client.setClientRole("audience");
                props.localAudioTrack.play();
                // changeRole(client);
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
                onClick={()=>{sendP2PMessage(props.userUid, "host")}}
                >연결</button>
                <span>{props.userUid}</span>
                <button
                onClick={()=>{
                    sendP2PMessage(props.userUid, "audience")
                    props.onAnswered(props.currentQuestionId)
                }}
                >완료</button>
                </>
                :
                <></>
                }
                </div>
            </div>
        </div>
        <div className="voiceCircle"/> 
        </>
    )

}

export default VoiceQuestion;