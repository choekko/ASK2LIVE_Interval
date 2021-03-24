import React, { useState }from 'react';
import Question from "./Question"
import Paper from '@material-ui/core/Paper';

const style = {
    paper : {
        position: "absolute",
        bottom:"0%",
        width: "100%",
        height : "100%",
        backgroundColor: "white",
        borderRadius: "20px 20px 0 0 "
    }
}

const QuestionList = () => {
    return (
        <>
        <Paper style={style.paper} elevation={1}/>
        </>
    )
}

export default QuestionList