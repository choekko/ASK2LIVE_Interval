import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, {useState, memo} from 'react';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LoginButton from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "../../styles/style.css";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  list: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
  }
}));


const LoginPage = () => { 
    const history = useHistory();
    if (localStorage.token) {
      history.push('/main')
    }

    const [loginId, setLoginId] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [open, setOpen] = useState(false);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    
    const dispatch = useDispatch();

    const Login = async({loginId, loginPassword}) => {

      let dataToSubmit = {
        username : loginId,
        password : loginPassword
      }

      const res = await axios.post('https://www.ask2live.me/api/user/login', dataToSubmit)
      console.log('1 res : ', res)
      window.localStorage.setItem('token', res.data.detail.token)
      // history.push('/main')
      window.location.replace('/main') // 수정 필요
    }

    return (
        <>
            <br/><br/><br/><br/>
            <div className="centered">
                <TextField 
                id="outlined-search" label="Id" type="search" variant="outlined"
                onChange={(event) => setLoginId(event.target.value)}
                />
                {/* <input onChange={(event) => setLoginId(event.target.value)}/> */}
                {"____"}
                <TextField 
                id="outlined-search" label="Password" type="search" variant="outlined"
                onChange={(event) => setLoginPassword(event.target.value)}
                />

            </div>
            <br/> <br/>
            <div className="centered">
                <LoginButton variant="contained" color="primary" onClick={() => Login({loginId, loginPassword})}>
                    로그인
                </LoginButton>
                {/* <button type="button" onClick={() => loginMatch(loginId)}/> */}
            </div>
            <br/><br/><br/>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                유효한 아이디가 아닙니다.
                </Alert>
            </Snackbar>
        </>
    )

};

export default LoginPage