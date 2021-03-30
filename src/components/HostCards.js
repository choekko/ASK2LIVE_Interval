import React from 'react';

import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from "@material-ui/core/IconButton"
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      maxWidth: "70em",
      minWidth: "18em"
      
    },
    profile: {
      flexGrow: 1,
      position: "relative",
      // paddingLeft: theme.spacing(2),
      // paddingRight: theme.spacing(2),
      maxWidth: "20em",
      // margin: "5%",
      display: "flex",
      height: 80,
      alignItems: "center",
      
      // justifyContent: 'center',
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      textAlign: "",
    },
}));

const style = {
  forwardIcon : {
    position: "absolute",
    left: "85%",
  }
}


const HostCard = ({host}) => {
    const history = useHistory();
    const classes = useStyles();
    const user = useSelector(state=> state.user);
    return(
        <>
        <Grid container justify="center">
        <Card container className={classes.profile}>
          {/* <CardActionArea onClick={onClick}> */}
            <CardHeader
              fontSize="large"
              avatar={
                <Avatar
                  aria-label="recipe"
                  src="../static/live_IU2.png"
                  className={classes.large}
                ></Avatar>
              }
              title={<Typography variant="h6">{host.nickname}</Typography>}
              subheader={`(${host.work_field})`}
            />
          {/* </CardActionArea> */}
          <IconButton
        style={style.forwardIcon}
        aria-label="back"
        onClick={()=>{
          if(Object.keys(user.data).length === 0){
            alert('로그인이 필요합니다.')
          }else{
            history.push({
              pathname: '/mypage/'+host.nickname,
              state: {host: host}
            })
          }
          }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
        </Card>
        
      </Grid>

        </>
    )
    
}
const HostCards = ({hosts}) => {
    const classes = useStyles();
    return (
        <>
        <h2>새롭게 호스트 권한을 획득한 유저</h2>
            {hosts.map((host) => (
                <>
                <Grid container className={classes.root}>
                <HostCard host={host} />
                </Grid>
                </>
            ))}
        </>
    )
}

export default HostCards;