import React, { useState }from 'react';
import Question from "./Question"
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import QuestionListButton from '@material-ui/icons/FormatListBulleted';

const style = {
    paper : {
        position: "absolute",
        bottom:"0%",
        width: "100%",
        height : "100%",
        backgroundColor: "white",
        borderRadius: "20px 20px 0 0 "
    },
    listbutton : {
        position: "absolute",
        bottom: "1.5%",
        right: "2.5%",
    }
}

const QuestionList = (props) => {
    return (
        <>
        <Paper style={style.paper} elevation={1}/>
        <IconButton style={style.listbutton} onClick={()=>{props.goListUp({transform : "translate(0, 100%)"}); props.goDark({opacity: "0", animation: "golight 0.7s"}); window.setTimeout(props.goDark({display: "none"}), 700)}} aria-label="question_list">
            <QuestionListButton/>
        </IconButton>
        </>
    )
}

export default QuestionList