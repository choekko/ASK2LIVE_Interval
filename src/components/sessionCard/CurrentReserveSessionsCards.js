import React, {useEffect, useState} from "react";
import { getSessionInfo } from '../../actions/SessionActions'
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { getSingleSessionInfo } from "../../actions/SessionActions";
import PropTypes from "prop-types";
import axios from "axios";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Box from "@material-ui/core/Box";
import "../../styles/style.css"
import getQuestionlist from "../../actions/QuestionListActions";


const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
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
      noWrap: "break-word",
      maxWidth: "20em",

    },
    title: {
      width: "100%",
      display:"flex",
      justifyContent:"center",
      paddingBottom: "1em"
    }

  }));

  const circleStyle={
    backgroundColor:"#E2D8CF",
    width : "155px",
    height : "155px",
    borderRadius: "77px",
  }

function CircularProgressWithLabel(props) {
  const history = useHistory();
  return (
    <Button 
      style={circleStyle}
      onClick={() => {
        history.push('/preQuestions/'+props.session.id)
        props.dispatch(getQuestionlist(props.session.id))

      }}>
    <Box position="relative" display="inline-flex">
      <div style={{color:"#D95032", width:"100%"}}>
      <CircularProgress thickness="2" size="10rem" variant='determinate' color='inherit'  {...props} /></div>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
          <Typography
            variant="body2"
            component="div"
            color="textSecondary"
            align='center'
          >3일 10시간<br/>남았어요</Typography>
      </Box>
    </Box>
    </Button>

  );
}

CircularProgressWithLabel.propTypes = {
    value: 10,
  };

const onClickWish = async(sessionId) => {
  
  const config = {
    headers: {'Authorization': 'Token ' + localStorage.token}
  }
  const data = {
    data: {}
  }

  axios.patch(
    "https://143.248.226.51:8000/api/reservation/hole/" + sessionId + "/wish",
    data,
    config,
  ).then((response) => {
    console.log(response)
  }).catch((e) => {
    console.log('error',e.response)
    alert(e.response.data.detail)
  })
}

const onClickWishCancel = async(sessionId) => {
  const config = {
    headers: {'Authorization': 'Token ' + localStorage.token}
  }
  const data = {
    data: {}
  }

  await axios.patch(
    "https://143.248.226.51:8000/api/reservation/hole/" + sessionId + "/wishcancel",
    data,
    config,
  ).then((response) => {
    console.log(response)
  }).catch((e) => {
    console.log('error',e.response)
    alert(e.response.data.detail)
  });;
}
// let buttonText='click'
const CurrentReserveSessionsCards = ({currentReserveSessions, setFlag}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const user = useSelector(state => state.user)

    CircularProgressWithLabel.propTypes = {
        value: PropTypes.number.isRequired,
      };
    
    console.log("Enter : CurrentReserveSessionsCards")
    return (
        <>
        <div className={classes.title}>
        <h2>오픈 신청 중인 라이브 Q&A</h2>
        </div>
        <div className={classes.root}  >
            {currentReserveSessions.map((session) => (
                <>
                <div className={classes.paper}>
                <Grid  alignItems='center'>
                        <CircularProgressWithLabel 
                          key={session.id} 
                          session = {session}
                          value={(session.hole_reservations.length) ? Math.ceil(session.hole_reservations[0].guests.length / session.hole_reservations[0].target_demand * 100) : 0} 
                          current={(session.hole_reservations.length) ? session.hole_reservations[0].guests.length  : 0 }
                          dispatch = {dispatch}/>
                          <Grid container justify="center" alignItems="center">
                            <Chip size="small"  label={`
                            ${session.hole_reservations[0].target_demand == 0? 
                              100 : Math.ceil(session.hole_reservations[0].guests.length / session.hole_reservations[0].target_demand * 100)}%달성`} />
                          </Grid>
                        <div className="call">
                            <Typography variant="h6" component="div" color='inherit'>
                                {session.title}
                            </Typography>
                            <Typography variant='caption' component="div" color="textSecondary">
                            {session.host_nickname.length > 5? session.host_nickname.substring(0,5)+'...' : session.host_nickname} 
                            | 
                            {session.host_work_field.length > 5? session.host_work_field.substring(0,5)+'...' : session.host_work_field}
                            </Typography>
                            <Typography variant='caption' component="div" color="textSecondary">
                            찜 {session.hole_reservations[0].guests.length}/{session.hole_reservations[0].target_demand}
                            </Typography> 
                        </div>
                        <Grid container justify="center">
                          <Chip 
                          variant="outlined"
                          clickable='true' 
                          onClick={() => {
                            console.log(user.data)
                            console.log(Object.keys(user.data).length)
                            if(Object.keys(user.data).length === 0){
                              alert('하단 네비에 로그인 버튼있음')
                            }else{
                              session.hole_reservations[0].guests.indexOf(user.data.detail.id) === -1 ?
                            <>
                            {onClickWish(session.id)}
                            {dispatch(getSessionInfo())}
                            </>
                            : 
                            <>
                            {onClickWishCancel(session.id)}
                            {dispatch(getSessionInfo())}
                            </>}
                            }
                            }
                            
                            label={Object.keys(user.data).length != 0 && session.hole_reservations[0].guests.indexOf(user.data.detail.id) != -1 ? "취소하기" : "찜하기"}></Chip>
                          </Grid>
                        <div>
                          
                        </div>
                   
                </Grid>
                </div>
                <br/>
            </>
            ))
            }
        </div>
        </>
    );
}

export default CurrentReserveSessionsCards;