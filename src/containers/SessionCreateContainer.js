import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/Remove";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CounterContainer from "../containers/CounterContainer";
import { increment, decrement } from "../reducers/counter";
import { SettingsInputAntenna } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  },
}));

const style = {
  backIcon: {
    position: "absolute",
  },
  field: {
    position: "relative",
    width: "80%",
    left: "0",
    right: "0",
    margin: "5% 0 0 5%",
  },
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
  text: {
    fontSize: "80%",
    fontWeight: "bold",
    position: "fixed",
    margin: "9% 0 0 5%",
  },
  forForm: {
    position: "fixed",
    height: "80%",
    width: "95%",
    padding: "3px",
    top: "10%",
    backgroundColor: "#FEFBF7",
  },
  buttonIcon: {
    position: "relative",
    margin: "7% 1% 0 1%",
    left: "50%",
  },
  submitButton: {
    position: "relative",
    width: "80%",
  },
};

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

  const onSubmit = async () => {
    // let finishDate = reserveDate;
    // finishDate.setHours(reserveDate.getHours() + 1);
    const headers = {
      'Authorization': 'Token ' + localStorage.token
    }
    console.log(localStorage.token);
    const data = {
        title: title,
        description: description,
        reserve_date: reserveDate,
        target_demand: counter
    };
    console.log(data);
    const res = await axios.post(
      "https://143.248.226.51:8000/api/hole/create",
      data,
      {headers:headers}
    );
    console.log("hole created: ", res);

    history.push('/');
  };

  return (
    <>
      <IconButton
        style={style.backIcon}
        aria-label="back"
        onClick={() => history.push("/")}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Grid container justify="center">
        <div className="centered BMDOHYEON" style={style.title}>
          Live Q&A 만들기
        </div>

        <form
          style={style.forForm}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            style={style.field}
            required
            id="outlined-required"
            label="Live Q&A 타이틀"
            placeholder="타이틀을 입력하세요"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
            name="title"
            // value={title}
          />

          <br></br>

          <TextField
            required
            style={style.field}
            id="datetime-local"
            label="기간을 선택하세요"
            type="datetime-local"
            placeholder="기간을 선택하세요"
            // defaultValue="2017-05-24T10:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            name="reserveDate"
            onChange={onChange}
            // value={reserveDate}
          />
          <br></br>
          <div style={style.text}>목표 인원 수</div>
          <IconButton
            style={style.buttonIcon}
            edge="start"
            aria-label="plus"
            size="small"
            onClick={onDecrease}
          >
            <RemoveCircleIcon />
          </IconButton>

          <TextField
            style={style.counter}
            id="standard-basic"
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            value={counter}
            // onChange={(e)=>setUserCount(e.target.value)}
            name="userCount"
          />
          {console.log(counter)}

          <IconButton
            style={style.buttonIcon}
            edge="start"
            aria-label="minus"
            size="small"
            onClick={onIncrease}
          >
            <AddCircleIcon />
          </IconButton>

          <TextField
            style={style.field}
            id="outlined-multiline-static"
            label="Live Q&A 짧은 소개"
            multiline
            rows={4}
            placeholder="소개글을 입력하세요"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
            name="description"
            // value={description}
          />

          {/* <div style={style.text}>
            Live Q&A 진행 예정일

        </div> */}
          {/* </Grid> */}
          <Button
            style={style.field}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Live Q&A 만들기
          </Button>
        </form>
      </Grid>
    </>
  );
};

export default SessionCreateContainer;
