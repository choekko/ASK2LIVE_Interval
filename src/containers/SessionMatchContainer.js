import React from "react"
import LiveSessionContainer from "../containers/LiveSessionContainer"

const MYLIVE = "mylive"
const OTHERLIVE = "Otherlive"
const RESERVE = "reserve" 

const SessionMatchContainer = (props) => {

    const sessionKind = props.match.params.state;
    let urlSearchParams = new URLSearchParams(props.location.search.slice(1));
    
    switch (sessionKind) {
        case MYLIVE:
            const roomId = urlSearchParams.get("roomId");
            const channelNum = urlSearchParams.get("channelNum");
            return <LiveSessionContainer roomId={roomId} channelNum={channelNum}/>
    }
    return (
        <p>SessionMatchContainer ERROR</p>
    )
}

export default SessionMatchContainer