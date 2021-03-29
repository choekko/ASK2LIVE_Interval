import React, { useState }from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { BorderColor } from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Question from "./Question"
import "../../styles/style.css" 

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: "95%",
      '& > *': {
        overflow: "hidden",
        margin: theme.spacing(2),
        width : "100%",
        height: theme.spacing(10),
        // height: "75px",
        backgroundColor: "rgba(192, 0, 0, 0)",
      },
      zIndex: "3",
    },
    border: {
        borderRadius: "15px",
        padding : "0.5em",
        // padding : "3px",
    }
  }));

export default function QuestionSwiper() {

    const classes = useStyles();
    const [transStyle, setTransStyle] = useState({
        transform : "translate(0, 0)",
    })

    // const handleTrans = () => {
    //     setTransStyle
    // }

    return (
        <>
        <div className={classes.root}>
        <Paper className={classes.border} elevation={0}>
            <Grid style={transStyle} className="trans" container justify="center">
                <Question userName="미" value="무" nextmove={()=>{setTransStyle({transform : "translate(0, -6em)"})}}/>
                <Question userName="어" value="야" nextmove={()=>{setTransStyle({transform : "translate(0, -12em)"})}}/>
                <Question userName="캣" value="호" nextmove={()=>{setTransStyle({transform : "translate(0, -18em)"})}}/>
            </Grid>
    
        </Paper>
        </div>
        </>
    );
}