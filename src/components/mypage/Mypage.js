import React, { useCallback } from "react"
import ProfileGate from './ProfileGate'

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxWidth: "70em",
  },
  my: {
    padding: theme.spacing(2),
    textAlign: "left",
    // color: theme.palette.text.secondary,
    backgroundColor: "lightgray",
  },
  myBottomCard: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    textAlign: "",
  },
}));


const MyPage = (props) => {
  const classes = useStyles();
  console.log(props);

  return (
    <>
      <Grid container justify="center">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item className={classes.my} xs={12}>
              <ProfileGate user={props.user}/>
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
          </Grid>
          <h3>Live QnA</h3>
        </div>
      </Grid>
    </>
  );
};

export default MyPage;
