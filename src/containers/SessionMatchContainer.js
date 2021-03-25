import React, {useEffect} from "react"
import {useHistory} from "react-router-dom"
import LiveSessionContainer from "../containers/LiveSessionContainer"

const LIVE = "live"
const RESERVE = "reserve" 

const SessionMatchContainer = (props) => {
    const history = useHistory()

    const sessionKind = props.match.params.state;
    let urlSearchParams = new URLSearchParams(props.location.search.slice(1));

    
    switch (sessionKind) {
        case LIVE:
            const roomId = urlSearchParams.get("roomId");
            const channelNum = urlSearchParams.get("channelNum");
            return <LiveSessionContainer roomId={roomId} channelNum={channelNum}/>
        default:
            return (
                <p>SessionMatchContainer ERROR</p>     
            )
        }
}

export default SessionMatchContainer