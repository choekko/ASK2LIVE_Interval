import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CounterContainer from "../containers/CounterContainer";
import { increment, decrement } from "../reducers/counter";
import { SettingsInputAntenna } from "@material-ui/icons";
import axios from "axios";
import { getSessionInfo, getUserSessionInfo } from "../actions/SessionActions";
import MypageNav from "../components/mypage/MypageNav";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    marginTop: theme.spacing(7),
    // fontFamily: "BMJUA"
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const style = {
  counter: {
    position: "relative",
    width: "15%",
    align: "center",
    margin: "7% 1% 7% 1%",
    left: "50%",
  },
  title: {
    position: "absolute",
    fontSize: "1.2em",
    padding: "12px",
  },

  forForm: {
    position: "fixed",
    height: "80%",
    width: "80%",
    padding: "3px",
    top: "10%",
    // backgroundColor: "skyblue",
  },
  buttonIcon: {
    position: "relative",
    margin: "auto",
    left: "50%",
  },
  submitButton: {
    position: "relative",
    margin: "auto 10%",
    // marginTop: '10%',
    width: "80%",
  },
};

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}

              Team Meerkat{'. '}

          {new Date().getFullYear()}
          {'.'}
      </Typography>
  );
}

const SessionCreateContainer = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    reserveDate: "",
    finishDate: "",
    // userCount: "",
  });

  const { title, description, reserveDate, finishDate } = inputs;

  const classes = useStyles();
  const counter = useSelector((state) => state.counter, []);
  const user = useSelector((state) => state.user.data.detail);
  const history = useHistory();

  const dispatch = useDispatch();

  const [userCount, setUserCount] = useState(0);

  const onIncrease = useCallback(() => dispatch(increment()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrement()), [dispatch]);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  });

  const onClick = async () => {
    // let finishDate = reserveDate;
    // finishDate.setHours(reserveDate.getHours() + 1);
    const config = {
      headers: { Authorization: "Token " + localStorage.token },
    };
    console.log(localStorage.token);
    const data = {
      title: title,
      description: description,
      reserve_date: reserveDate,
      target_demand: counter,
    };
    console.log(data);
    const res = await axios.post(
      "https://www.ask2live.me/api/hole/create",
      data,
      config
    );
    console.log("hole created: ", res);
    setTimeout(() => {
      dispatch(getUserSessionInfo(localStorage.token));
      dispatch(getSessionInfo());
    }, 200);
    history.push("/mypage");
  };

  return (
    <>
      <MypageNav text={"Live Q&A 만들기"} />
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AssignmentIcon />
          </Avatar>

          <Typography
            component="h1"
            variant="body1"
            butterBottom
            style={{ fontFamily: "BMJUA" }}
          >
            세션 정보를 입력하세요
          </Typography>
          {/* <Typography variant="subtitle1" gutterBottom>
                    세션 정보를 입력하세요
                </Typography> */}
          <div className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="session title"
              name="title"
              // autoComplete="title"
              placeholder="세션 제목을 입력해주세요"
              autoFocus
              value={title}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              // variant="outlined"
              margin="normal"
              required
              fullWidth
              id="reserveDate"
              label="Live Q&A 진행 예정일"
              name="reserveDate"
              type="datetime-local"
              // autoComplete="title"
              autoFocus
              value={reserveDate}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />


            <Grid style={{height : "6em"}}container spacing={3} justify="flex-end">
              <Grid justify='center' justifyContents='center' item xs={6} >
                <div style={{height: "100%", display: "flex", alignItems: "center", float : "right", fontFamily:"BMJUA"}} variant="body2" >
                <AccountCircleIcon/> &nbsp; 목표 인원 수
                </div>
              </Grid>

                <div style={{display: "flex",  alignItems:"center", marginRight:'1em' }}>

                <IconButton
                  size="small"
                  onClick={onDecrease}
                >
                  <RemoveCircleIcon />
                </IconButton>

                <TextField
                // margin="normal"
                style={{ width: "4em" }}
                id="target_demand"
                name="target_demand"
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                value={counter}
                name="userCount"
              />

                <IconButton size="small" onClick={onIncrease}>
                  <AddCircleIcon />
                </IconButton>
                </div>
          </Grid>
        

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              name="description"
              placeholder="소개글을 입력해주세요"
              value={description}
              label="Live Q&A 짧은 소개"
              type="password"
              id="description"
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClick}
            >
              Live Q&A 만들기
            </Button>
          </div>
        </div>
        <Box mt={8}>
                <Copyright />
            </Box>
      </Container>
    </>
  );
};

export default SessionCreateContainer;
