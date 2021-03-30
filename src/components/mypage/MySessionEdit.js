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
import CounterContainer from "../../containers/CounterContainer";
import { increment, decrement } from "../../reducers/counter";
import { SettingsInputAntenna } from "@material-ui/icons";
import axios from "axios";
import { getUserSessionInfo } from '../../actions/SessionActions'
import MypageNav from './MypageNav'

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
forForm: {
    position: 'flex',
    height: "100%",
    width: "100%",
    maxWidth: '79em',
    padding: "3px",
    top: "10%",
    backgroundColor: "skyblue",
    },
  field: {
    display: "flex",
    justifyContent: 'center',
    width: "80%",
    margin: "2% auto",
  },
  counter: {
    // position: "relative",
    display: 'flex',
    float: 'left',
    width: "15%",
    align: "center",
    margin: "auto",
    // left: "35%",
  },
  buttonIcon: {
    // position: "relative",
    display: 'flex',
    float: 'left',
    margin: "auto",
    // left: '40%',
    justifyContent: 'right',
  },
  text: {
    fontSize: "80%",
    fontWeight: "bold",
    float: 'left',
    display: 'flex',
    margin: "3% 0 0 10%",
  },
  button: {
    position: "relative",
    width: "40%",
    maxWidth: "25em",
    margin: "auto 5%",
  },
};

const MySessionEdit = (props) => {
    console.log("MySessionEdit");
    console.log(props);
    const session = props.location.state;

    console.log(session)

  const [inputs, setInputs] = useState({
    title: session.title,
    description: session.description,
    reserveDate: session.reserveDate,
    target_demand: session.target_demand
  });

  const { title, description, reserveDate, target_demand } = inputs;

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

  const onClick = async () => {
    const config = {
      headers: {'Authorization': 'Token ' + localStorage.token}
    }
    console.log(localStorage.token);
    const data = inputs;
    console.log(data);
    const res = await axios.patch(
      "https://143.248.226.51:8000/api/hole/update/" + session.id,
      data,
      config,
    );
    console.log("hole created: ", res);
    dispatch(getUserSessionInfo());
    history.push('/mypage');
  };

  return (
    <>
    <MypageNav text={'Live Q&A 편집'}/>
      <Grid container justify="center">

        <div
          style={style.forForm}
          noValidate
          autoComplete="off"
        >
          <TextField
            style={style.field}
            required
            id="outlined-required"
            label="Live Q&A 타이틀"
            defaultValue={session.title}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
            name="title"
          />

          <br></br>

          <TextField
            required
            style={style.field}
            id="datetime-local"
            label="기간을 선택하세요"
            type="datetime-local"
            defaultValue={session.reserveDate}
            // defaultValue="2017-05-24T10:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            name="reserveDate"
            onChange={onChange}
          />
          <br></br>
          <div style={style.text}>목표 인원 수</div>
          <div style={{left: '40%'}}>
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
            defaultValue={session.target_demand}
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
          </div>

          <TextField
            style={style.field}
            id="outlined-multiline-static"
            label="Live Q&A 짧은 소개"
            multiline
            rows={4}
            defaultValue={session.description}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
            name="description"
          />


          <Grid container justify="center">
            <Button
              style={style.button}
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => {
                history.goBack();
              }}
            >
              <div style={style.font3} color="030916">
                취소하기
              </div>
            </Button>

            <Button
              style={style.button}
              variant="contained"
              color="primary"
              size="large"
              onClick={onClick}
            >
              <div style={style.font3} color="030916">
                확정하기
              </div>
            </Button>
          </Grid>
        </div>
        <div
              style={{
                backgroundColor: "yellow",
                height: "5em",
                width: "100%",
                marginBottom: "5%",
              }}
            />
      </Grid>
    </>
  );
};

export default MySessionEdit;
