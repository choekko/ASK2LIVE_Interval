import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import Checkbox from '@material-ui/core/Checkbox';
import { PinDropSharp } from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';


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
    myPaper : {
        border : "3px solid white",
        boxShadow: "0px 0px 2px 3px black"
    },
    otherPaper: {
        border : "2px solid black",
    }
  }));

const style = {
    card : {
        borderRadius : "15px 15px 0 0",
        backgroundColor: "#D95032",
        height: "1.5rem",
        // height: "20px",
        padding: "0.3rem",
        // padding: "3px",
    },

}

export default function SimplePaper(props) {
const classes = useStyles();

return (
    <>
    {props.isFirst?
    <div style={{marginLeft: "10px", marginBottom:"10px"}}>
     <div style={{borderRadius:"100%", display:"inline-block", backgroundColor:"#d95032", width:"10px", height:"10px"}}></div>
    <span className="CookieRun" style={{marginLeft: "8px",marginBottom:"10px"}}>
       지금 답변중!</span>
    </div>
    :
    null
    }
    <div className={classes.root}>
    <Paper className={props.myQuestion? classes.myPaper : classes.otherPaper} style={props.isVoice? {backgroundColor:"#D95032"} : null} elevation={2} >
        <div style={style.card}>
            <p style={{margin:"4px 0 0 4px", padding :"0"}}className="BMDOHYEON">{props.userName}</p>
        </div>
            <p style={{margin:"4px 0 0 8px", padding :"0"}}className="NanumGothic2">{props.value}</p>
    </Paper>
    </div>
    {props.isFirst? 
    <>
    <div style={{width:"100%", borderBottom:"1px solid rgba(0, 0, 0, 0.5)"}}/>
    <br/>
    </>
    :
    null
    }
    </>
);
}