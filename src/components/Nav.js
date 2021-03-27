import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {giveUser} from "../reducers/user";

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Apps';
import Alert from '@material-ui/icons/Notifications';
import LoginButton from '@material-ui/icons/MeetingRoom';
import { Person, Home } from '@material-ui/icons';
import ExitButton from '@material-ui/icons/PowerSettingsNew'

const [MyPageIcon, HomeIcon] = [Person, Home];

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
      },
  }));
  

const NavOfGuest = (props) => {
    const classes = useStyles();
    const history = useHistory();


  return (
    <>
      {/* <CssBaseline /> */}
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <HomeIcon/>
                </IconButton>
                <Typography variant="h5" className={classes.title}>
                ASK 2 LIVE
                </Typography>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="alert">
                    <Alert/>
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="login" onClick={()=>{
                        history.push('/login');
                    }}>
                    <LoginButton/>
                </IconButton>
            </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
            <Container>
            로그인 전
            </Container>
    </>
  );
}

const NavOfUser = (props) => {
    
    const user = props.user.data.detail;
    // console.log('NavOfUser', user)
    
    const classes = useStyles();
    const dispatch = useDispatch();

    const history = useHistory();


  return (
    <>
      {/* <CssBaseline /> */}
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <HomeIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                ASK 2 LIVE
                </Typography>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="alert">
                    <Alert/>
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="mypage">
                    <MyPageIcon onClick={ () => {
                      history.push("/mypage");
                    } }/>
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="logout">
                    <ExitButton onClick={()=>{
                        localStorage.clear();
                        window.location.replace('/');
                    }}/>
                </IconButton>
            </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
            <Container>
            {user.pk}({user.email})님 로그인 중
            </Container>
    </>
  );
}

export {
    NavOfGuest,
    NavOfUser,
}