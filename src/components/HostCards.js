import React from 'react';
import { useHistory } from "react-router"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";

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

const onClick = () => {
    console.log("onCLICK!");
};

const HostCard = ({host}) => {
    const classes = useStyles();
    return(
        <>
        <Grid container justify="center">
        <Card className={classes.profile}>
          <CardActionArea onClick={onClick}>
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
              subheader={`${host.bio}(${host.work_field})`}
            />
          </CardActionArea>
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