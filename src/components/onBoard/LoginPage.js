import React, {useState, memo} from 'react';
import { userDummy } from '../../dummydatas/userDummy';
import { useSelector, useDispatch } from 'react-redux';
import SnackBar from '../SnackBar';
import { useHistory } from 'react-router-dom'
import { giveUser } from '../../modules/user';

import LoginButton from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import "../../styles/style.css"

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

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

// const getToken = () => {
//   const res = axios.get('https://143.248.226.51:8000/api/hole').then(
//       response => response.data)
//       return res;
  
//   console.log(res)
// }

const LoginPage = () => { 
    const [loginId, setLoginId] = useState("")
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const userList = userDummy; //여기 바꾸면 됨!!
    
    const dispatch = useDispatch();
    const history = useHistory();

    const loginMatch = (loginId) => {
        const userListIndex = userList.findIndex(e => e.userId === loginId);
        console.log("userListIndex" + userListIndex);
        if (userListIndex === -1){
            handleClick()
        }
        else {
            dispatch(giveUser(userList[userListIndex]));
            localStorage.setItem("user", JSON.stringify(userList[userListIndex]))
            history.push('/')
        }
    }

    return (
        <>
            <br/><br/><br/><br/>
            <div className="centered">
                <TextField 
                id="outlined-search" label="ID" type="search" variant="outlined"
                onChange={(event) => setLoginId(event.target.value)}
                />
                {/* <input onChange={(event) => setLoginId(event.target.value)}/> */}
            </div>
            <br></br>
            <div className="centered">
                <LoginButton variant="contained" color="primary" onClick={() => loginMatch(loginId)}>
                    로그인
                </LoginButton>
                {/* <button type="button" onClick={() => loginMatch(loginId)}/> */}
            </div>
            <br/><br/><br/>
            <div className="centered">
                <h3>테스트용 유효 아이디</h3>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                {userList.map((user)=>{
                    return (
                        <>
                            <Divider light />
                            <ListItem button>
                                <ListItemText primary={user.userNickName} />
                            </ListItem>
                        </>
                    )
                })}
                <Divider light />
                </List>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                유효한 아이디가 아닙니다.
                </Alert>
            </Snackbar>
        </>
    )

};

export default LoginPage