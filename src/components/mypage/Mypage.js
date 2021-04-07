import React, { useCallback } from "react";
import ProfileGate from "./ProfileGate";
import MypageNav from "./MypageNav";
import { SessioinCreateButton } from "../SessionCreateButton";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: "100%",
    top: "9%",
    backgroundColor: "#EF5941",
  },
  my: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(6),
    textAlign: "left",
    // color: theme.palette.text.secondary,
    backgroundColor: "#EF5941",
    width: "100%",
    // maxWidth: "43em",
    // borderRadius: "15px",
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
      {/* <div className={classes.root}>{}</div> */}
      <Grid container justify="center" >
        <div className={classes.my}>

            <ProfileGate user={props.user} />

        </div>
      </Grid>
      <div style={{ position: "relative", top: "50%" }}>
        <SessioinCreateButton />
      </div>
      <div style={{ padding: "0 16px", margin: "auto", maxWidth: "43em" }}>
        <h3 className="CookieRun">Live QnA</h3>
      </div>
    </>
  );
};

export default MyPage;
