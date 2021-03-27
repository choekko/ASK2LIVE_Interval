import React, { useState }from 'react';
import { useSelector } from "react-redux" 
import Question from "./Question";
import axios from "axios";

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseListButton from '@material-ui/icons/ExpandMore';



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
        top: "0%",
        right: "2.5%",
    }
}

const QuestionList = (props) => {


    const questionAry = useSelector(state => state.questionlist)

    return (
        <>
        <Paper style={style.paper} elevation={1}>
            {questionAry.arrived ? 
            questionAry.data.detail.map((questionInfo) => 
            <Question userName={questionInfo.user} value={questionInfo.question}/>)
            : <p>로딩중</p>}
        <IconButton style={style.listbutton} onClick={()=>{props.goListUp({transform : "translate(0, 100%)"}); props.goDark({opacity: "0", animation: "golight 0.7s"}); setTimeout(()=>{props.goDark({display: "none"})}, 700)}} aria-label="question_list">
            <CloseListButton fontSize="large" />
        </IconButton>
        </Paper>
         
        </>
    )
}

export default QuestionList