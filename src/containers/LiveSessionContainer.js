import React from 'react'
import LiveSession from "../components/liveSession/LiveSession"

import "../styles/style.css"
import "../index.css"
import { sessionDummy } from "../dummydatas/sessionDummy"


const LiveSessionContainer = (props) => {

    const sessionList = sessionDummy;
    const listIndex = sessionList.findIndex((session) => session.roomId === props.roomId )
    const imageLink = sessionList[listIndex].imageLink;
    const hostName = sessionList[listIndex].hostName;

    return (
        <>
            <LiveSession hostName={hostName} imageLink={imageLink}/>
        </>
    )
}

export default LiveSessionContainer