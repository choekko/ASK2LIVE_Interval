import React, {useState} from 'react'
import {useDispatch} from "react-redux"
import LiveSession from "../components/liveSession/LiveSession"
import JoinCard from "../components/JoinCard"
import getEnteredSession from "../actions/EnteredSessionActions"

import "../styles/style.css"
import "../index.css"
import { sessionDummy } from "../dummydatas/sessionDummy"


const LiveSessionContainer = (props) => {

    console.log("LiveSessionContainer Props", props);
    const dispatch = useDispatch()
    const [join, setJoin] = useState(props.joinPass);

    console.log(join);

    // if (1) //props.isHost
    //     return <LiveSession hostName={hostName} imageLink={imageLink} channelNum={channelNum} isHost={1}/>
    if (!join)
        return <JoinCard holeId={props.holeId} channelNum={props.channelNum} hostName={props.hostName} hostImage={props.hostImage} setJoin={setJoin} isHost={props.isHost}/>
    else
    {
        if (!props.isHost){
            console.log("This is not host")
            dispatch(getEnteredSession(props.channelNum))
        }
        return <LiveSession holeId={props.holeId} hostName={props.hostName} imageLink={props.hostImage} channelNum={props.channelNum} isHost={props.isHost}/>
    }
}

export default LiveSessionContainer