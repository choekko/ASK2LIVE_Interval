import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


import "../../styles/style.css";
import { SessionConfirm } from "./SessionConfirm";
import {
  getSessionInfo,
  getUserSessionInfo,
} from "../../actions/SessionActions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2%",
    width: "100%",
    height: "7.5em",
    maxWidth: "30em",
    borderRadius: "20px",
    boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
  },
  media: {
    cursor: "pointer",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    height: "inherit",
  },
  cookieWrapper: {
    float: "left",
    width: "4em",
    height: "4em",
    marginLeft: "1em",
    backgroundPosition: "center center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  useCookie: {
    float: "left",
    margin: "auto",
    backgroundImage: "url('/static/cookieMould.png')",
    backgroundPosition: "center center",
    backgroundSize: "100%",
    width: "4em",
    height: "inherit",
    overflow: "hidden",
  },
  layerfordark: {
    position: "fixed",
    maxWidth: "73em",
    minHeight: "35em",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: "0.6",
    transition: "all 0.7s",
  },
}));

const style = {
  alert : {
      boxShadow: "2px 2px 2px 2px #D95032",    // 섀도우 색
      border: "solid 1px white",    // 테두리 색
      backgroundColor:"black"      // 배경색
  }
}

const MypageLiveSession = (props) => {
  const user = useSelector((state) => state.user.data.detail);
  const { session, setFlag } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [listup, setListUp] = useState({ transform: "translate(0, 100%)" });
  const [dark, setDark] = useState({
    transform: "translate(0, 100%)",
    display: "none",
  });
  const [open, setOpen] = useState(false);

  // 여는 함수, onClick에 해당 함수 넣으면 클릭시 등장
  const handleClick = () => {       
    setOpen(true);
  };

  // 닫는 함수. 이미 아래에 자동적으로 사용되고 있음.
  const handleClose = async(event, reason) => {
    await dispatch(getUserSessionInfo(localStorage.token))
    setListUp({ transform: "translate(0, 100%)" });
    setDark({ animation: "golight 0.7s" });
    setTimeout(() => {
    setDark({ display: "none" });
    }, 700);
    history.replace("/mypage");
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onDelete = async () => {
    console.log("DELETE SESSION!");
    const config = {
      headers: { Authorization: "Token " + localStorage.token },
    };

    const res = await axios.delete(
      "https://www.ask2live.me/api/hole/delete/" + session.id,
      config
    );
    console.log("hole deleted: ", res);
    history.push("/mypage");
  };

  if (!session) return null;
  return (
    <>
      <Grid
        container
        item
        direction="row"
        justify="center"
        style={{
          width: "100%",
          maxWidth: "21em",
          float: "left",
          margin: "auto",
        }}
      >
        <Card key={session.livehole_id} className={classes.root} >
          <br></br>

          <div
            style={{ backgroundImage: "url('/static/live_IU2.png')"}}
            className={classes.cookieWrapper}
          >
            <div className={classes.useCookie}></div>{" "}
          </div>

          <CardHeader
            
            style={{ padding: "0 8px 0 8px", transform: "translate(0, -5px)" }}
            title={<Typography variant="body2">{session.title}</Typography>}
            subheader={
                <>
                <Typography variant="body2">
                <Moment format="MM.DD hh시 mm분">
                {session.reserve_date}
                </Moment>
                </Typography>
                </>
                }
            action={
              user.id === parseInt(session.host) &&
              session.status != "DONE" && (
                <IconButton
                  aria-label="settings"
                  onClick={() => {
                    <>
                      {history.push({
                        pathname: '/createSession',
                        search: '?holeId=' + session.id,
                      })}
                    </>;
                  }}
                >
                  <EditIcon fontSize="small"/>
                </IconButton>
              )
            }
          />
          <CardContent style={{padding: 0, }}>
            <CardActions style={{paddingLeft: 4, paddingTop: 0}}>
              {session.status != "DONE" && user.id === parseInt(session.host) && (
                <Button
                  style={{ backgroundColor: "#3f51b5", paddingTop: 0, paddingBottom: 0 }}
                  size="normal"
                  color="primary"
                  onClick={() => {
                    setListUp({ transform: "translate(0, 50%)" });
                    setDark({ animation: "godark 0.7s" });
                  }}
                >
                  {/* <Typography variant="body2" style={{ fontWeight: 600 }}> */}
                  <span className="BMJUA" style={{color: "#FFFFFF"}}>
                    예약 확정하기
                  </span>
                  {/* </Typography> */}
                </Button>
              )}
              {user.id === parseInt(session.host) && (
                <>
                <Button
                  style={{borderColor: "#3f51b5", marginLeft: "1.5em",}}
                  size="normal"
                  color="primary"
                  onClick={() => {
                    <>
                      {onDelete()}
                      {setTimeout(
                        () => dispatch(getUserSessionInfo(localStorage.token)),
                        200
                      )}
                    </>;
                  }}
                >
                  {/* <Typography variant="body2" style={{ fontWeight: 600 }}> */}
                  <span className="BMJUA" color="#3f51b5">
                    삭제하기
                  </span>
                  {/* </Typography> */}
                </Button>
                
                </>
              )}
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
      
      <div style={listup} className="hiddenlist" maxWidth="">
        <SessionConfirm
          session={session}
          goListUp={setListUp}
          goDark={setDark}
          handleClick={handleClick}
        />
      </div>
      <div style={dark} className="mypagelayerfordark"></div>
      <Snackbar
        style={{ position: "fixed", bottom: "50%" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} style={style.alert} severity="success">
          <span style={{ color: "white" }}>Live Q&A 생성 완료!</span>
        </Alert>
      </Snackbar>
    </>
  );
};

export default MypageLiveSession;
