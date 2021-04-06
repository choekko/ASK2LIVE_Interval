import React, { useCallback } from "react";
import ProfileGate from "./ProfileGate";
import MypageNav from "./MypageNav";
import { SessioinCreateButton } from "../SessionCreateButton";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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
      <MypageNav text={"프로필"} />
      <Grid container justify="center">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item className={classes.my} xs={12}>
              <ProfileGate user={props.user}/>
            </Grid>
          </Grid>
          <h3>Live QnA</h3>
        </div>
      </Grid>
          <SessioinCreateButton />
    </>
  );
};

export default MyPage;
