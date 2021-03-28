import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { useHistory } from "react-router";

import {
  MyLiveSessionsCards,
  OtherLiveSessionsCards,
  CurrentReserveSessionsCards,
} from "../components/sessionCard";
import Mypage from "../components/mypage/Mypage";
// import Profile from '../components/mypage/Profile';
import SessionCardContainer from "./SessionCardContainer";
import { SessioinCreateButton } from "../components/SessionCreateButton";
import MypageLiveSession from "../components/mypage/MypageLiveSession";

// material-ui
import Grid from "@material-ui/core/Grid";

const MyPageContainer = () => {
  const user = useSelector((state) => state.user);
  const sessions = useSelector((state) => state.session.data);

  
  let myLiveSessions = [];

    console.log('MyPage useEffect');
    if (Object.keys(sessions).length != 0) {
        console.log(sessions);
        sessions.map((session) => {
          console.log(session);
    
          if (
            session.status == "NOT_START" &&
            session.host_nickname === user.data.detail.nickname
          ) {
            myLiveSessions = [...myLiveSessions, session];
          }
        });
      }




  if (!Object.keys(user.data).length) return null;
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Mypage user={user.data.detail} />
        {myLiveSessions.length != 0 ? (
          <MypageLiveSession session={myLiveSessions} />
        ) : (
          <SessioinCreateButton />
        )}
      </Grid>
    </>
  );
};

export default MyPageContainer;
