import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from 'react';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ExitButton from '@material-ui/icons/PowerSettingsNew';
import LoginButton from '@material-ui/icons/MeetingRoom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/icons/Notifications';
import { Person, Home } from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Apps';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

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
        bottom: "2%",
        left : "0",
        right: "0",
        margin : "auto",
        backgroundColor: "#eb4e27",
        borderRadius: "15px", 
        maxWidth: "80em"
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
            <Grid container justify="center" alignItems="center">
            <Toolbar>
                <IconButton  color="inherit" aria-label="menu">
                    <HomeIcon/>
                </IconButton>
                <IconButton  color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <IconButton  color="inherit" aria-label="alert">
                    <Alert/>
                </IconButton>
                <IconButton  color="inherit" aria-label="login" onClick={()=>{
                        history.push('/login');
                    }}>
                    <LoginButton/>
                </IconButton>
            </Toolbar>
            </Grid>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}

const NavOfUser = (props) => {
    
    const user = props.user.data.detail;
    
    const classes = useStyles();
    const dispatch = useDispatch();

    const history = useHistory();


  return (
    <>
      {/* <CssBaseline /> */}
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
            <Grid container justify="center" alignItems="center">

            <Toolbar>
                <IconButton color="inherit" aria-label="menu">
                    <HomeIcon onClick={() => {
                      history.push('/');}} />
                </IconButton>
                <IconButton color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <IconButton color="inherit" aria-label="alert">
                    <Alert/>
                </IconButton>
                <IconButton color="inherit" aria-label="mypage">
                    <MyPageIcon onClick={ () => {
                      history.push("/mypage");
                    } }/>
                </IconButton>
                <IconButton color="inherit" aria-label="logout">
                    <ExitButton onClick={()=>{
                        localStorage.clear();
                        window.location.replace('/');
                    }}/>
                </IconButton>
            </Toolbar>
            </Grid>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}

export {
    NavOfGuest,
    NavOfUser,
}