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
        border : "2px solid white",
        boxShadow: "0px 0px 4px 2px black"
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
    <div className={classes.root}>
    <Paper className={props.myQuestion? classes.myPaper : null} style={props.isVoice? {backgroundColor:"#D95032"} : null} elevation={2} >
        <div style={style.card}>
            <p style={{marginTop:"4px", padding :"0"}}className="BMDOHYEON">{props.userName}</p>
        </div>
            <p style={{margin:"4px 0 0 4px", padding :"0"}}className="NanumGothic2">{props.value}</p>
    </Paper>
    </div>
);
}