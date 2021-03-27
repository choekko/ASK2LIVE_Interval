import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';

const style = {
    title : {
        fontSize: "2em"
    },
    button : {
        position: 'relative',
        width: '80%',
        marginBottom: '20px',
    },
    buttonIcon: {
        fontSize: 30,
        fontColor: 'black',
        backgroundColor: '#C0C0C0',
        borderRadius: '50%',
        marginLeft: '150%',
    },
    buttonText: {
        align: 'left',
        fontSize: '80%',
        margin: '8px',
        marginLeft: '-20%',
        fontWeight: 900,
    },
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  my: {
    padding: theme.spacing(2),
    textAlign: 'left',
    // color: theme.palette.text.secondary,
    backgroundColor: 'lightgray'
  },
  liveQnA: {
    padding: theme.spacing(2),
    textAlign: 'left',
    // color: theme.palette.text.secondary,
  },
  myBottomCard: {
      padding: theme.spacing(2),
      textAlign: 'center'
  }
}));

const history = useHistory;

const ProfileGate = ({user}) => {
    console.log(user.nickname)
    return(
        <>
        <div className='MyPage'>
        <h2>My</h2>
        </div>
        <Grid container justify="center">
        <Button
        style={style.button}
        variant="contained"
        color="default"
        // endIcon={<AddIcon style={style.buttonIcon}/>}
        onClick={() => {history.push('/createSession')}}>
            <div style={style.buttonText} align="left">
                {user.nickname}
            </div>
        </Button>
        </Grid>
        </>
    )
}

const LiveQnA = ({user}) => {

    return(
    <>
    <div className='LiveQnA'>
    <h3>Live QnA</h3>
    <Grid container justify="center">
        <Button
        style={style.button}
        variant="contained"
        color="default"
        endIcon={<AddIcon style={style.buttonIcon}/>}
        onClick={() => {history.push('/createSession')}}>
            <div style={style.buttonText} align="left">
                Live Q&A를 통해
                <br></br>
                경험을 함께 나누어보세요
            </div>
        </Button>
        </Grid>
    </div>
    </>
    )
}

const MyPage = () => {
  const classes = useStyles();
  const userResponse = useSelector(state => state.user);
  const user = userResponse.data.detail

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item className={classes.my} xs={12}>
            <ProfileGate user = {user}/>
          {/* <Paper className={classes.paper}>xs=12</Paper> */}
        <Grid container spacing={3}>
        <Grid item className={classes.myBottomCard} xs>
            24명 <br />
            팔로우
          {/* <Paper className={classes.paper}>xs</Paper> */}
        </Grid>
        <Grid item xs>
            17명 <br />
            팔로잉
          {/* <Paper className={classes.paper}>xs</Paper> */}
        </Grid>
        <Grid item xs>
            14개 <br />
            미리 찜하기
          {/* <Paper className={classes.paper}>xs</Paper> */}
        </Grid>
      </Grid>
        </Grid>

        <Grid item className={classes.liveQnA} xs={12}>
            <LiveQnA user = {user}/>
          {/* <Paper className={classes.paper}>xs=12</Paper> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default MyPage;