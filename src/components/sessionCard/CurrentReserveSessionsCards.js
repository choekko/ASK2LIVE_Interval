import React, {useState} from "react";
import { getSessionInfo } from '../../actions/SessionActions'
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from "react-moment"

// import 'antd/dist/antd.css';
import { Progress, Badge } from 'antd';

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import "../../styles/style.css"
import getQuestionlist from "../../actions/QuestionListActions";
import { Block } from "@material-ui/icons";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexGrow: 1,
      justifyContent : "center",
      maxWidth:"40em",
      
      "& > *": {
        margin: "0 1em 1em 1em",
        width: theme.spacing(25),
        height: theme.spacing(40)
      }
    },
    paper: {
      display:"flex",
      justifyContent:"center",
      paddingTop: "0.5em",
      maxWidth: "20em",
      minWidth: "17em"

    },
    title: {
      width: "100%",
      display:"flex",
      justifyContent:"center",
      // paddingBottom: "1em"
    },
    content: {
      width: "80%",
      position: "relative",
      top: "5px",

      // display: "inline-Block",
    },
    date: {
      position: "relative",
      top: "10px",
      display: "inline-Block",
    },
    work_field: {
      fontSize:"xx-small",
      marginLeft: "1em",
    },
    wish: {
      fontSize:"x-small",
      marginLeft: "0.5em",
    },
    questions: {
      fontSize:"x-small",
      marginLeft: "0.5em",
    },
    questionIcon : {
      marginLeft: "2.5em"
    },
    avatarWrapper : {
      display: "table",
      marginLeft: "auto",
      marginRight: "auto",
      transform: "translate(0,-4.9em)",
    },
    avatar : {
      width: theme.spacing(14),
      height: theme.spacing(14),
      // opacity: 0.7,
      
    },
    check : {
      position: "absolute",
      paddingTop: "80px",
    },

    chipGrid : {
      width: "100%",
      position: "absolute",
      paddingTop: "110px"
    },
    progress : {
      
    },
    wishButton : {
      width:"80%",
      height: "35px",
      textAlign: "center",
      backgroundColor: '#F24822', 
      marginTop: '7px',
    },



  }));

const onClickWish = (sessionId) => {
  const config = {
    headers: {'Authorization': 'Token ' + localStorage.token}
  }
  const data = {
    data: {}
  }
  axios.patch(
    "https://www.ask2live.me/api/reservation/hole/" + sessionId + "/wish",
    data,
    config,
  ).then((response) => {
    console.log("onClickWish 응답 받음", response)
  }).catch((e) => {
    console.log('error',e.response)
    alert(e.response.data.detail)
  })
}

const onClickWishCancel = (sessionId) => {
  const config = {
    headers: {'Authorization': 'Token ' + localStorage.token}
  }
  const data = {
    data: {}
  }

  axios.patch(
    "https://www.ask2live.me/api/reservation/hole/" + sessionId + "/wishcancel",
    data,
    config,
  ).then((response) => {
    console.log('onClickWishCacel 응답 받음', response)
  }).catch((e) => {
    console.log('error',e.response)
    alert(e.response.data.detail)
  });;
}

const CurrentReserveSessionsCards = ({currentReserveSessions}) => {
  console.log("컴포넌트 시작 Enter : CurrentReserveSessionsCards")

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const user = useSelector(state => state.user)
    let i = 0;
    return (
        <>
        {console.log("렌더링 시작")}
        <div className={classes.root}>
            {currentReserveSessions.map((session) => (
                <>
                {console.log(session)}
                <Paper className={classes.paper} page={i++}>
                <Grid container justify="center">
                  <Progress 
                    className={classes.progress}
                    strokeWidth="5"
                    type="dashboard"
                    strokeColor="#F24822"
                    gapDegree = "85"
                    width={140}
                    format={percent => {
                      if(percent == 100){
                        return(
                          <>
                          <div className={classes.avatarWrapper}>
                            <Avatar className={classes.avatar} src={`https://www.ask2live.me${session.host_profile_image}`} />
                          </div>
                          <CheckIcon size="large" style={{fontSize: "40",  position:"absolute", top:"32", left:"52"}} color='error'/>
                          {/* <span className="NanumGothic3" style={{color: "red", fontSize: ""}}>성공!</span> */}
                          </>
                        )
                      }else{
                        return(
                          <>
                          {/* {percent} Days */}
                          <div className={classes.avatarWrapper}>
                            <Avatar className={classes.avatar} src={`https://www.ask2live.me${session.host_profile_image}`} />
                          </div>
                          {/* <div className="NotoSans3" style={{fontSize:"large", position:"absolute", transform:"translate(1em, -3em)"}}>안녕안녕</div> */}
                          </>
                        )}
                      
                      }}
                    success = {{strokeColor:"blue"}}
                    percent={(session.hole_reservations) ? 
                            Math.ceil(
                              session.hole_reservations.guests.length / session.hole_reservations.target_demand <= 1 ?
                              session.hole_reservations.guests.length / session.hole_reservations.target_demand * 100 : 100) : 0}/>
                        {/* <CircularProgressWithLabel 
                          key={session.id} 
                          session = {session}
                          value={(session.hole_reservations) ? 
                            Math.ceil(
                              session.hole_reservations.guests.length / session.hole_reservations.target_demand <= 1 ?
                              session.hole_reservations.guests.length / session.hole_reservations.target_demand * 100 : 100) : 0} 
                          current={(session.hole_reservations) ? session.hole_reservations.guests.length  : 0 }
                          dispatch = {dispatch}/> */}
                          <Grid container className={classes.chipGrid} justify="center" alignItems="center">
                            <Chip 
                              size="small"  
                              color="default" 
                              label={<>
                            <span className="NanumGothic3">{session.hole_reservations.target_demand == 0? 
                              100 : Math.ceil(session.hole_reservations.guests.length / session.hole_reservations.target_demand * 100)}%달성</span></>} 
                            />
                          </Grid>
                          
                        <Grid justify="flex-start" className={classes.content}>
                            <span className="NanumGothic4">
                                {session.title}
                            </span>
                            <Typography variant='caption' component="div" color="textSecondary">
                            {session.host_username? session.host_username : "익명"} 
                            <span className={classes.work_field}>
                            {session.host_work_company? session.host_work_company : " "}
                            {session.host_work_field? " | "+session.host_work_field : " "}
                            </span>
                            </Typography>
                            <Grid item className={classes.date}>
                            <Typography variant='caption' component="p" >
                              <span className="NanumGothic3">{`예정일자 `}</span>
                            <Moment format="MM.DD hh:mm">
                              {session.reserve_date}
                            </Moment>
                            </Typography>
                            

                            <Grid container alignItems="stretch" >
                            <div style={{color:"#F24822", paddingTop:"0.4em"}}><FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon></div>
                            <p className={classes.wish} >
                            <span className="NanumGothic3">찜 {session.hole_reservations.guests.length}/{session.hole_reservations.target_demand}</span>
                            </p>
                            <div className={classes.questionIcon} style={{color:"#F24822", paddingTop:"0.5em"}}><CommentIcon fontSize="small"></CommentIcon></div>
                            <p className={classes.questions}>
                            <span className="NanumGothic3">질문 {session.count_questions}개</span>
                            </p>
                            </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid container justify="center">
                          <Button 
                          className={classes.wishButton}
                          variant="contained"
                          color="primary"
                          clickable='true' 
                          startIcon={<FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon>}
                          onClick={() => {
                            if(Object.keys(user.data).length === 0){
                              alert('로그인이 필요합니다.')
                            }else{
                              session.hole_reservations.guests.indexOf(user.data.detail.id) === -1 ?
                            <>
                            {onClickWish(session.id)}
                            {setTimeout((()=> dispatch(getSessionInfo())),200)}
                            </>
                            : 
                            <>
                            {onClickWishCancel(session.id)}
                            {setTimeout((()=> dispatch(getSessionInfo())),200)}
                            </>}
                            }
                            }
                            
                            >{Object.keys(user.data).length != 0 && session.hole_reservations.guests.indexOf(user.data.detail.id) != -1 ? "취소하기" : "찜하기"}</Button>
                          </Grid>
                        <div>
                        </div>
                        </Grid>
                </Paper>
                <br/>
            </>
            ))
            }
        </div>
        </>
    );
}

export default CurrentReserveSessionsCards;