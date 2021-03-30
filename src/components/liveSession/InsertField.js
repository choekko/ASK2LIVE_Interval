import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import QuestionList from "./QuestionList";
import getQuestionList from "../../actions/QuestionListActions";
import getEnteredSession from "../../actions/EnteredSessionActions";

import ParticipantsButton from '@material-ui/icons/Group';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { SportsRugbySharp } from '@material-ui/icons';
import QuestionButton from '@material-ui/icons/ContactSupport';
import QuestionListButton from '@material-ui/icons/FormatListBulleted';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "none",
    width: "100%",
    height: "2.5em",
  },
  root2: {
    padding: '0 0 0 10px',
    margin : "0",
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    boxShadow: "none",
    Width : "7em",
    height: "2.5em",
  },
  input: {
    marginLeft: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.6)",
    flex: 1,
  },
  iconButton: {
    backgroundColor: "white",
    padding: "8.5px",
  },
  iconButton2: {
    backgroundColor: "#D95032",
    padding: "8.5px",
  },
  divider: {
    height: 35,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {

    const dispatch = useDispatch();
   const classes = useStyles();
  const pressEnter = (e) => {
      if (e.key == 'Enter'){
          props.goMessageSend();
      }
  }
  return (
      <>

    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="채팅을 입력하세요"
        value={props.message}
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e) => props.goSetMessage(e.target.value)}
        onKeyPress={pressEnter}
      />
    </Paper>
    <Paper className={classes.root2}>
    <IconButton onClick={props.goMessageSend} className={classes.iconButton} aria-label="send">
        <SendIcon/>
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      {props.isHost?
        <IconButton className={classes.iconButton} aria-label="participants"  onClick={()=>{dispatch(getEnteredSession(props.channelNum)); props.goUserUp(); props.goDark({display: "block", animation: "godark 0.7s"})}}>
         <ParticipantsButton/>
        </IconButton>
      :
      <IconButton onClick={()=>{props.goQueUp(); props.goDark({display: "block", animation: "godark 0.7s"})}} className={classes.iconButton} aria-label="question">
        <QuestionButton/>
      </IconButton>
      }
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton onClick={()=>{console.log("press button"); props.goListUp(); props.goDark({display: "block", animation: "godark 0.7s"})}} className={classes.iconButton2} aria-label="question_list">
        <QuestionListButton/>
      </IconButton>
    </Paper>
    </>
  );
}