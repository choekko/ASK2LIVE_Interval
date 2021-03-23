import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { SportsRugbySharp } from '@material-ui/icons';
import QuestionButton from '@material-ui/icons/ContactSupport';
import QuestionListButton from '@material-ui/icons/FormatListBulleted';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    margin : "0 0 10px 0",
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    boxShadow: "none",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 2,
  },
  divider: {
    height: 35,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="채팅을 입력하세요"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="send">
        <SendIcon/>
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label="question">
        <QuestionButton/>
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label="question_list">
        <QuestionListButton/>
      </IconButton>
    </Paper>
  );
}