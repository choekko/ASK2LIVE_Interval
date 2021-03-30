import { useSelector } from "react-redux" 
import React, { useState }from 'react';
import Question from "./Question";
import axios from "axios";

import Paper from '@material-ui/core/Paper';



const QuestionList = (props) => {


    const questionAry = useSelector(state => state.questionlist)

    return (
        <>
        <Paper className="questionList" elevation={0}>
            {questionAry.arrived ? 
            questionAry.data.detail.map((questionInfo) => 
            <Question userName={questionInfo.user_nickname} value={questionInfo.question}/>)
            : <p>로딩중</p>}

        </Paper>
         
        </>
    )
}

export default QuestionList