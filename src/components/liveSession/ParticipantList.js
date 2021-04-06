import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import Paper from "@material-ui/core/Paper"
import Participant from "./Participant"
import axios from "axios"

const style = {
    participantlist : {
        width: "100%",
        paddingTop: "1.5em",
        borderRadius : "15px",
    }
}

const ParticipantList = (props) => {

    const participants = useSelector(state => state.enteredSession);


    return (
        <>
        <p className="NanumGothic3" style={{position:"absolute", marginTop: "1.5em"}}>
            {participants.arrived?
                participants.data.detail.participant.length+"명이 듣고 있어요"
                :
                <></>
            }
        </p>
            <Paper style={style.participantlist} elevation={0}>
                <br/>
                <div style={{position:"absolute", height:"100%", width:"100%", overflow:"auto"}}>
                    {participants.arrived ? 
                        participants.data.detail.participant.map((participant) => 
                        <Participant 
                        nickName={participant.username}
                        workField={participant.work_field}
                        workCompany={participant.work_company}
                        profileImage={participant.profile_image_url}/>)
                        : 
                        <p>로딩중</p>}
                </div>
            </Paper>
        </>
    )

}

export default ParticipantList;