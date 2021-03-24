import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { blue } from '@material-ui/core/colors';
import { PinDropSharp } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    //   width: "95%",
      width: "100%",
      marginBottom: "1em",
    //   marginBottom: "3px",
      
      '& > *': {
        display: "",
        // margin: theme.spacing(2),
        width : "100%",
        float: "left",
        height: theme.spacing(10),
        // height: "70px",
        borderRadius : "15px",
      },
    },
  }));

const style = {
    card : {
        borderRadius : "15px 15px 0 0",
        backgroundColor: "#7A6890",
        height: "1.5rem",
        // height: "20px",
        padding: "0.3rem",
        // padding: "3px",
    },
}

export default function SimplePaper(props) {
const classes = useStyles();

return (
    <div className={classes.root}>
    <Paper elevation={2} >
        <div style={style.card}>
            {props.value}
            <FormControlLabel style={style.lavel}
            control={<Checkbox icon={<FavoriteBorder style={style.checkIcon}/>} checkedIcon={<Favorite style={style.checkIcon}/>} name="checkedH" />}
            />
            <br/>
            <button onClick={props.nextmove}>다음 질문</button>
        </div>
    </Paper>
    </div>
);
}