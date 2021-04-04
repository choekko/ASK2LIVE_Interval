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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

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
  alert: {
    boxShadow: "2px 2px 2px 2px #D95032", // 섀도우 색
    border: "solid 1px white", // 테두리 색
    backgroundColor: "black", // 배경색
  },
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Team Meerkat{". "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SessionCreateContainer = () => {
  const [inputs, setInputs] = useState({
    title: "",
    isTitleValid: false,
    description: "",
    isDescriptionValid: false,
    reserveDate: "",
    isReserveDateValid: false,
  });
  const [open, setOpen] = useState(0);

  const { title, isTitleValid, description, isDescriptionValid, reserveDate, isReserveDateValid, finishDate } = inputs;

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

  // 여는 함수, onClick에 해당 함수 넣으면 클릭시 등장
  const handleClick = () => {
    setOpen(true);
  };

  // 닫는 함수. 이미 아래에 자동적으로 사용되고 있음.
  const handleClose = (event, reason) => {
    history.push("/mypage");
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const validateTitle = enteredTitle => {
    if (enteredTitle.length > 0) {
      onchange({isTitleValid, true})
      onchange(title, enteredTitle)
    } else {
      onchange(title, enteredTitle)
    }
  };

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
    await axios
      .post("https://www.ask2live.me/api/hole/create", data, config)
      .then((res) => {
        console.log("hole created: ", res);
        handleClick();
        setTimeout(() => {
          dispatch(getUserSessionInfo(localStorage.token));
          dispatch(getSessionInfo());
        }, 200);
      });
  };

  return (
    <>
      <MypageNav text={"Live Q&A 만들기"} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <div className={classes.form} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="session title"
              name="title"
              error={title.length === 0 ? true : false}
              helperText={title.length === 0 ? "제목을 입력해 주세요" : ""}
              // autoComplete="title"
              placeholder="세션 제목을 입력해주세요"
              autoFocus
              value={title}
              onChange={event => validateTitle(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              // variant="outlined"
              margin="normal"
              required
              fullWidth
              error={reserveDate.length === 0 ? true : false}
              helperText={title.length === 0 ? "예약 일자를 입력해 주세요" : ""}
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

            <Grid
              style={{ height: "6em" }}
              container
              spacing={3}
              justify="flex-end"
            >
              <Grid justify="center" justifyContents="center" item xs={6}>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    float: "right",
                    fontFamily: "BMJUA",
                  }}
                  variant="body2"
                >
                  <AccountCircleIcon /> &nbsp; 목표 인원 수
                </div>
              </Grid>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "1em",
                }}
              >
                <IconButton size="small" onClick={onDecrease}>
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
              error={description.length === 0 ? true : false}
              helperText={description.length === 0 ? "어떤 내용의 Q&A인지 설명해 주세요" : ""}
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
      </Container>
      <Snackbar
        style={{ position: "fixed", bottom: "50%" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} style={style.alert} severity="success">
          <span style={{ color: "white" }}>Live Q&A 생성 완료!</span>
        </Alert>
      </Snackbar>
    </>
  );
};

export default SessionCreateContainer;
