import React from "react";
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
    const classes = useStyles();

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
                <button>연결</button>
                <button
                onClick={()=>{props.onAnswered(props.currentQuestionId)}}
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