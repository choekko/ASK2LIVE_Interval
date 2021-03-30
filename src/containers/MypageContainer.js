import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { useHistory } from "react-router";
import Mypage from "../components/mypage/Mypage";
// import Profile from '../components/mypage/Profile';
import SessionCardContainer from "./SessionCardContainer";
import { SessioinCreateButton } from "../components/SessionCreateButton";
import MypageLiveSession from "../components/mypage/MypageLiveSession";
import MypageNav from "../components/mypage/MypageNav";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

// material-ui
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '70em',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    width: '100%',
    maxWidth: '70em',
    paddingLeft: theme.spacing(4),
    borderBottom: 'solid thin',
    marginBottom: '2%',
  },
}));

const style = {
  listcenter : {
    left: 0,
    right : 0,
    marginLeft: "auto",
    marginRight: "auto",
  }
}


const getSessionInfo = async () => {
  return await axios.get("https://143.248.226.51:8000/api/hole");
};

const getUserInfo = async () => {
  const config = {
    headers: { Authorization: "Token " + localStorage.token },
  };
  return await axios.get("https://143.248.226.51:8000/api/user/read", config);
};

const MyPageContainer = () => {
  // const [user, setUser] = useState();
  // const [sessions, setSessions] = useState();
  const [flag, setFlag] = useState(false)

  // useEffect(() => {
  //   getUserInfo().then((res) => {
  //     if (res.data.response === "SUCCESS") setUser(res.data.detail);
  //   });
  //   getSessionInfo().then((res) => {
  //     console.log("세션길이: ", res.data.length);
  //     if (res.data.length > -1) setSessions(res.data);
  //   });
  // }, []);

  const user = useSelector((state) => state.user.data.detail);
  const sessions = useSelector((state) => state.session.data);
  const classes = useStyles();
  console.log(user);
  console.log(sessions);

  let myLiveSessions = [];
  let myDoneSessions = [];
  if (Object.keys(sessions).length != 0) {
    console.log(sessions);
    sessions.map((session) => {
      console.log(session);

      if (
        session.status === "NOT_START" &&
        session.host_nickname === user.nickname
      ) {
        myLiveSessions = [...myLiveSessions, session];
      }
      else if (session.status === "DONE" &&
                session.host_nickname === user.nickname)
                {
                  myDoneSessions = [...myDoneSessions, session]
                }
    });
    console.log("나의 끝난 세션", myDoneSessions)
  }


  const [open, setOpen] = useState(true);
  const [openDone, setOpenDone] = useState(true)

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickDone = () => {
    setOpenDone(!openDone);
  };
  
  if (!user || !sessions) return <p>로딩중</p>;
  return (
    <>
      <MypageNav text={"프로필"} />
      <Grid container direction="row" justify="center" alignItems="center">
        <Mypage user={user} />
        <SessioinCreateButton />

        
      </Grid>


      <Grid container direction="row" justify="center" alignItems="center">
        <div style={{display: "inline-block", width: "100%", maxWidth : "73em"}}>

          <ListItem style={style.listcenter} button className={classes.nested}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItem>

       



      <ListItem style={style.listcenter} button onClick={handleClick} className={classes.nested}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="모집 중인 Live" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding >

            {myLiveSessions.length != 0 && (
          myLiveSessions.map((session) => (
            <>
              <MypageLiveSession session={session} setFlag={setFlag}/>
              {console.log("반복문", session.title)}
            </>
          ))
        )}

        </List>
      </Collapse>


      <ListItem style={style.listcenter} button onClick={handleClickDone} className={classes.nested}>
        <ListItemIcon> 
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="진행한 Live" />
        {openDone ? <ExpandLess /> : <ExpandMore />}
      </ListItem>


      <Collapse in={openDone} timeout="auto" unmountOnExit >
        <List component="div" disablePadding>

        <ListItem button >
            {myDoneSessions.length != 0 && (
          myDoneSessions.map((session) => (
            <>
              <MypageLiveSession session={session} setFlag={setFlag}/>
              {console.log("반복문", session.title)}
            </>
          ))
        )}
      </ListItem>

        </List>
      </Collapse>
      </div>
    </Grid>



      <div
        style={{
          backgroundColor: "skyblue",
          height: "4em",
          width: "100%",
          marginBottom: "5%",
        }}
      />
    </>
  );
};

export default MyPageContainer;
