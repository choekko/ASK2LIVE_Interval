import React, {useEffect} from "react"
import {useHistory} from "react-router-dom"
import LiveSessionContainer from "../containers/LiveSessionContainer"
import ReserveToLive from "../components/ReserveToLive"

const LIVE = "live"
const RESERVE = "reserve" 

const SessionMatchContainer = (props) => {
    const history = useHistory()

    const sessionKind = props.match.params.state;
    let urlSearchParams = new URLSearchParams(props.location.search.slice(1));
    console.log(props);
    console.log(sessionKind);
    
    switch (sessionKind) {
        case LIVE:
            const holeId = urlSearchParams.get("holeId");
            const channelNum = urlSearchParams.get("channelNum");
            return <LiveSessionContainer hostName={props.location.state.hostName} hostImage={props.location.state.hostImage} holeId={holeId} channelNum={channelNum} joinPass={props.location.state.joinPass} isHost={props.location.state.isHost}/>
        case RESERVE: // 여긴 호스트만 거쳐간다
            const holeId_reserve = urlSearchParams.get("holeId");
            console.log(holeId_reserve)
            return <><ReserveToLive hostName={props.location.state.hostName} hostImage={props.location.state.hostImage} holeId={holeId_reserve}/></>
        default:
            return (
                <p>SessionMatchContainer ERROR</p>     
            )
        }
}

export default SessionMatchContainer