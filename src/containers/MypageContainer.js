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
import MypageConfirmedSession from "../components/mypage/MypageConfirmedSession";
import MypageNav from "../components/mypage/MypageNav";
import { getUserSessionInfo } from "../actions/SessionActions";
import { getUserInfo } from "../actions/UserActions";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

// material-ui
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "70em",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    width: "100%",
    maxWidth: "70em",
    paddingLeft: theme.spacing(4),
    borderBottom: "solid thin",
    marginBottom: "2%",
  },
}));

const style = {
  listcenter: {
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  alert: {
    position: "fixed",
    left: 0,
    right: 0,
    margin: "auto",
    zIndex: 2,
    maxWidth: "25em",
    size: "large",
  },
};

const MyPageContainer = (props) => {
  console.log("컴포넌트 실행!");

  const [flag, setFlag] = useState({ display: "none" });
  const [render, setRender] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useSelector((state) => state.user.data);
  const sessions = useSelector((state) => state.mySession.data);
  const wishSessions = useSelector((state) => state.mySession.data);

  console.log("세션 :", sessions);

  useEffect(() => {
    const token = localStorage.token
    console.log("useEffect");
    dispatch(getUserInfo(token));
    dispatch(getUserSessionInfo(token));
    setRender(true);
  }, [render]);

  let myLiveSessions = [];
  let myDoneSessions = [];
  let myWishSessions = [];
  let myConfirmSessions = [];
  if (Object.keys(sessions).length != 0) {
    sessions.detail.my_hole.map((session) => {
      if (
        session.status === "NOT_START" &&
        parseInt(session.host) === user.detail.id
      ) {
        if (session.reservation_status === "HOST_CONFIRMED") {
          myConfirmSessions = [...myConfirmSessions, session];
        } else {
          myLiveSessions = [...myLiveSessions, session];
        }
      } else if (
        session.status === "DONE" &&
        parseInt(session.host) === user.detail.id
      ) {
        myDoneSessions = [...myDoneSessions, session];
      }
    });
  }

  if (Object.keys(wishSessions).length != 0) {
    wishSessions.detail.wish_hole.map((session) => {
      myWishSessions = [...myWishSessions, session];
    });
  }

  const [open, setOpen] = useState(true);
  const [openDone, setOpenDone] = useState(true);
  const [openWish, setOpenWish] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleConfirmClick = () => {
    setOpenConfirm(!openConfirm);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickDone = () => {
    setOpenDone(!openDone);
  };

  const handleClickWish = () => {
    setOpenWish(!openWish);
  };

  if (!user.detail || !sessions.detail) return <p>로딩중...</p>;

  return (
    <>
      <MypageNav text={"프로필"} />
      <Grid container direction="row" justify="center" alignItems="center">
        <Mypage user={user} />
        <SessioinCreateButton />
      </Grid>
      <div style={flag}>
        <Alert style={style.alert} onClose={() => {}}>
          This is a success alert — check it out!
        </Alert>
      </div>

      <Grid container direction="row" justify="center" alignItems="center">
        <div
          style={{ display: "inline-block", width: "100%", maxWidth: "73em" }}
        >
          <ListItem
            style={style.listcenter}
            button
            onClick={handleConfirmClick}
            className={classes.nested}
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="진행 확정된 Live" />
            {openConfirm ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={!openConfirm} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {myConfirmSessions.length != 0 &&
                myConfirmSessions.map((session) => (
                  <>
                    <MypageConfirmedSession
                      session={session}
                      setFlag={setFlag}
                    />
                  </>
                ))}
            </List>
          </Collapse>

          <ListItem
            style={style.listcenter}
            button
            onClick={handleClick}
            className={classes.nested}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="모집 중인 Live" />
            {open ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={!open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {myLiveSessions.length != 0 &&
                myLiveSessions.map((session) => (
                  <>
                    <MypageLiveSession session={session} setFlag={setFlag} />
                  </>
                ))}
            </List>
          </Collapse>

          <ListItem
            style={style.listcenter}
            button
            onClick={handleClickDone}
            className={classes.nested}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="진행한 Live" />
            {openDone ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={!openDone} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {myDoneSessions.length != 0 &&
                myDoneSessions.map((session) => (
                  <>
                    <MypageLiveSession session={session} setFlag={setFlag} />
                  </>
                ))}
            </List>
          </Collapse>

          <ListItem
            style={style.listcenter}
            button
            onClick={handleClickWish}
            className={classes.nested}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="찜했던 Live" />
            {openWish ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={!openWish} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {myWishSessions.length != 0 &&
                myWishSessions.map((session) => (
                  <>
                    <MypageLiveSession session={session} setFlag={setFlag} />
                  </>
                ))}
            </List>
          </Collapse>
        </div>
      </Grid>

      <div
        style={{
          height: "4em",
          width: "100%",
          marginBottom: "4%",
        }}
      />
    </>
  );
};

export default MyPageContainer;
