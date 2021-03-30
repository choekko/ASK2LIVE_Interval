import React, {useEffect, useState} from "react";
import { useSelector,useDispatch } from 'react-redux';

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

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
    borderRadius: "35px",
  }

  function CircularProgressWithLabel(props) {
      const session = props.session
      console.log(session)
    return (
      <Button 
        style={circleStyle}>
      <Box position="relative" display="inline-flex">
        <div style={{color:"#D95032", width:"100%"}}>
        <CircularProgress thickness="2" size="5rem" variant='determinate' color='inherit'  {...props} /></div>
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
                <Chip size="small"  label={`
                ${session.hole_reservations[0].target_demand == 0? 
                    100 : Math.ceil(session.hole_reservations[0].guests.length / session.hole_reservations[0].target_demand * 100)}%달성`} />
            </Grid>
        </Box>
      </Box>
      </Button>
  
    );
  }

const SessionDetail = ({session}) => {
    const classes = useStyles();
    
    return(
        <>
        <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={9} className={classes.paper}>
          {session.title}<br/>
          {session.reserve_date}<br/>
          찜 {session.hole_reservations[0].guests.length} / {session.hole_reservations[0].target_demand}
          {session.hole}
        </Grid>
        <Grid item xs={3}>
        <CircularProgressWithLabel 
            className={classes.paper}
            key={session.id} 
            session = {session}
            value={(session.hole_reservations.length) ? Math.ceil(session.hole_reservations[0].guests.length / session.hole_reservations[0].target_demand * 100) : 0} 
            current={(session.hole_reservations.length) ? session.hole_reservations[0].guests.length  : 0 }
        />
        </Grid>
        
      </Grid>
        
        </div>
        </>
    )
}

const QuestionCard = ({question}) => {
    const classes = useStyles();
    return(
        <>
        <Card className={classes.card}>
        <CardHeader
            subheader={question.user_nickname}/>
        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {question.question}
        </Typography>
        </CardContent>
        </Card>
        </>
    )
}

const ListPreQuestions = ({questions}) => {
    console.log('qestions', questions)
    return(
        <>
        {questions.data.detail.map((question) => 
        <>
            <QuestionCard question={question}/>
            <Divider light />
            </>
        )}
        </>
    )
}
const PreQuestions = () => {
    const questions = useSelector(state => state.questionlist)
    
    let targetSession = {};

    const href = window.location.href
    const sessionId = parseInt(href.split('/')[4])
    const sessions = useSelector(state => state.session.data)

    if(Object.keys(sessions).length != 0){
        sessions.map((session) => {
            if(sessionId === session.id){
                targetSession = {...targetSession, session}
            }
        })
    }

    return (
            <>
        {console.log('hihihi',targetSession)}
        <SessionDetail session={targetSession.session}/>
        {Object.keys(questions.data).length > 0 ?<ListPreQuestions questions={questions}/> : null}
        </>
    )
  
}
export default PreQuestions;