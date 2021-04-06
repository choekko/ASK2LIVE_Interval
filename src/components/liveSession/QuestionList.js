import { useSelector } from "react-redux" 
import React, { useState }from 'react';
import Question from "./Question";
import axios from "axios";

import Paper from '@material-ui/core/Paper';

const style ={
    nav : {
        display: "table",
        position:"absolute",
        bottom: "90%",
        width: "100%",
        height: "2em",
    }
}


const QuestionList = (props) => {

    const [click1, setClick1] = useState({borderBottom:"2px solid black"})
    const [click2, setClick2] = useState();

    const questionAry = useSelector(state => state.questionlist)
    const myName = useSelector(state => state.user.data.detail.username)
    console.log(myName);

    return (
        <>
        <div style={style.nav}>
            <td>
                <div style={{display:"flex",  justifyContent : "center"}}>
                <p 
                style={click1} 
                onClick={()=>{setClick2(); setClick1({borderBottom:"2px solid black"})}}
                className="Gmarket3">등록된 질문</p>
                </div>
            </td>
            <td>
                <div style={{display:"flex",  justifyContent : "center"}}>
                <p 
                style={click2}
                onClick={()=>{setClick1(); setClick2({borderBottom:"2px solid black"})}}
                className="Gmarket3">답변된 질문</p>
                </div>
            </td>
        </div>
        
        {click1 ?
        <>
        <Paper className="questionList" elevation={0}>
            {questionAry.arrived ? 
            questionAry.data.detail.map((questionInfo) =>
                questionInfo.is_answered ?
                    null
                :
                    questionInfo.user_username === myName?
                    <Question  isVoice={questionInfo.is_voice} userName={questionInfo.user_username} value={questionInfo.question} myQuestion={true}
                    isFirst={questionInfo === questionAry.data.detail[questionAry.data.detail.findIndex((value) => value.is_answered === false)]}/>
                    :
                    <Question isVoice={questionInfo.is_voice} userName={questionInfo.user_username} value={questionInfo.question} myQuestion={false}
                    isFirst={questionInfo === questionAry.data.detail[questionAry.data.detail.findIndex((value) => value.is_answered === false)]}/>
            )

            : <p>로딩중</p>}
        </Paper>
        </>
        :
        <>
        <Paper className="questionList" elevation={0}>
            {questionAry.arrived ? 
            questionAry.data.detail.map((questionInfo) =>
                questionInfo.is_answered ?
                    questionInfo.user_username === myName?
                    <Question  isVoice={questionInfo.is_voice} userName={questionInfo.user_username} value={questionInfo.question} myQuestion={true}/>
                    :       
                    <Question isVoice={questionInfo.is_voice} userName={questionInfo.user_username} value={questionInfo.question} myQuestion={false}/>
                :
                    null
            )

            : <p>로딩중</p>}
        </Paper>
        </>
        }
        </>
    )
}

export default QuestionList