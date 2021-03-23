import React, { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { blue } from '@material-ui/core/colors';
import Question from "./Question"
import Grid from '@material-ui/core/Grid';

import "../../styles/style.css" 
import { BorderColor } from '@material-ui/icons';

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
        backgroundColor: "rgba(192, 0, 0, 0)",
      },
    },
    border: {
        borderRadius: "15px",
        padding : "0.5em",
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
                <Question value="무"/>
                <Question value="야"/>
                <Question value="호"/>
            </Grid>
    
        </Paper>
        </div>
        <button onClick={()=>{setTransStyle({transform : "translate(0, -6em)"})}}/>
        </>
    );
}