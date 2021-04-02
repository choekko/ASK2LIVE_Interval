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
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import CounterContainer from "../containers/CounterContainer";
import { increment, decrement } from "../reducers/counter";
import { SettingsInputAntenna } from "@material-ui/icons";
import axios from "axios";
import { getSessionInfo, getUserSessionInfo } from '../actions/SessionActions'
import MypageNav from '../components/mypage/MypageNav'

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
},
form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
},
submit: {
    margin: theme.spacing(3, 0, 2),
},
}));


const style = {
  field: {
    position: "relative",
    display: 'flex',
    width: "100%",
    maxWidth: '50em',
    left: 0,
    right: 0,
    margin: "auto",
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
    maxWidth: '40em',
    float: 'left',
    marginLeft: '10%',
    // position: "relative",
    // display: 'flex',
    marginLeft: "auto",
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
    margin: 'auto 10%',
    // marginTop: '10%',
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
  const user = useSelector(state => state.user.data.detail);
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
      headers: {'Authorization': 'Token ' + localStorage.token}
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
      "https://www.ask2live.me/api/hole/create",
      data,
      config,
    );
    console.log("hole created: ", res);
    setTimeout(() => {
      dispatch(getUserSessionInfo(localStorage.token))
      dispatch(getSessionInfo())
    }
      , 200 )
    history.push('/mypage');
  };

  return (
    <>
      <MypageNav text={'Live Q&A 만들기'} />
      <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

            <Avatar className={classes.avatar}>
                    <AssignmentIcon />
                </Avatar>

                <Typography component="h1" variant="h6">
                    Sign in
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    세션 정보를 입력하세요
                </Typography>
                <form className={classes.form} noValidate >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        // value={accountId}
                        // onChange={event => setAccountId(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        // value={password}
                        // onChange={event => setPassword(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/join" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
                <Copyright />
            </Box> */}
        </Container>

        
    </>
  );
};

export default SessionCreateContainer;
