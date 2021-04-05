import React, {useEffect, useState} from "react";
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import PreQuestionNav from './PreQuestionNav'
import MypageNav from '../mypage/MypageNav'
import getQuestionlist from "../../actions/QuestionListActions";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      display: 'flex',
      maxWidth: "70em",
      minWidth: "18em"
    },
    paper: {
      padding: theme.spacing(2),
    },
    card: {
        maxWidth: "30em",
    }
  }));

const circleStyle={
    backgroundColor:"#E2D8CF",
    width : "77px",
    height : "77px",
    borderRadius: "38px",
  }

  function CircularProgressWithLabel(props) {
      const session = props.session
      console.log(session)
    return (
      <Button 
        style={circleStyle}>
      <Box position="relative" display="inline-flex">
        <div style={{color:"#D95032", width:"100%"}}>
        <CircularProgress thickness="3" size="5rem" variant='determinate' color='inherit'  {...props} /></div>
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
             <Grid container justify="center" alignItems="center">
                <Chip size="small" variant="outlined" label={`
                ${session.hole_reservations.target_demand == 0? 
                    100 : Math.ceil(session.hole_reservations.guests.length / session.hole_reservations.target_demand * 100)}%`} />
            </Grid>
        </Box>
      </Box>
      </Button>
  
    );
  }

const SessionDetail = ({session}) => {
  const history = useHistory();
    const classes = useStyles();

    if(session === undefined){
      return(
        <>
        로딩중
        </>
      )
    }
    
    
    return(
        <>
        <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={9} className={classes.paper}>
          {session.title}<br/>
          {session.reserve_date}<br/>
          찜 {session.hole_reservations.guests.length} / {session.hole_reservations.target_demand}
          {session.hole}
        </Grid>
        <Grid item xs={3}>
        <CircularProgressWithLabel 
            className={classes.paper}
            key={session.id} 
            session = {session}
            value={(session.hole_reservations) ? 
              Math.ceil(
                session.hole_reservations.guests.length / session.hole_reservations.target_demand <= 1 ?
                session.hole_reservations.guests.length / session.hole_reservations.target_demand * 100 : 100) : 0} 
            current={(session.hole_reservations) ? session.hole_reservations.guests.length  : 0 }
        />
        </Grid>
        
      </Grid>
        
        </div>
        </>
    )
}

const ListPreQuestions = ({questions, session}) => {
    console.log('qestions', questions)
    return(
        <>
        <PreQuestionNav session={session}/>
        
        </>
    )
}

const PreQuestions = () => {
    const dispatch = useDispatch()
    const questions = useSelector(state => state.questionlist)
    const sessions = useSelector(state => state.session.data)
    let targetSession = {};

    const href = window.location.href
    const sessionId = parseInt(href.split('/')[4])

    if(Object.keys(sessions).length != 0){
        sessions.map((session) => {
          console.log('DEBUG22',session)
            if(sessionId === session.id){
                targetSession = {...targetSession, session}
            }
        })
      }
    useEffect(() => {
      if(Object.keys(questions.data).length === 0){
        dispatch(getQuestionlist(sessionId))
      }
    })
    
    return (
            <>
        <MypageNav text={'Live Q&A 상세'} />
        
        <SessionDetail session={targetSession.session}/>

        {Object.keys(questions.data).length > 0 ? <ListPreQuestions questions={questions} session={targetSession.session}/> : null}

        </>
    )
  
}
export default PreQuestions;