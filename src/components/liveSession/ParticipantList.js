import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import Paper from "@material-ui/core/Paper"
import Participant from "./Participant"
import axios from "axios"

const style = {
    participantlist : {
        width: "100%",
        borderRadius : "15px",
        padding: "0",
    }
}

const ParticipantList = (props) => {

    const participants = useSelector(state => state.enteredSession);


    return (
        <>
        <div style={{display:"flex", position:"absolute", height:"9%", alignItems:"flex-end", justifyContent:"center" }}>

            <p className="NanumGothic3" style={{borderBottom:"1px solid black", margin:"0"}}>
                {participants.arrived?
                    participants.data.detail.participant.length+"명이 듣고 있어요"
                    :
                    <></>
                }
            </p>
        </div>
            <Paper style={style.participantlist} elevation={0}>
                <div style={{position:"absolute", top: "10%", height:"90%", width:"100%", overflow:"auto"}}>
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