import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {useSelector} from "react-redux"
import LiveSessionContainer from "../containers/LiveSessionContainer"
import ReserveToLive from "../components/ReserveToLive"
import axios from "axios"

const LIVE = "live"
const RESERVE = "reserve" 

const SessionMatchContainer = (props) => {
    const history = useHistory()
    const [match, setMatch] = useState()

    const sessionKind = props.match.params.state;
    let urlSearchParams = new URLSearchParams(props.location.search.slice(1));
    console.log(props);
    console.log(sessionKind);

    const holeId = urlSearchParams.get("holeId");

    const tmp =  useSelector(state => state.user.data)
    const currUser = tmp.detail? tmp.detail.nickname : "";

    useEffect(() => {
        axios.get("https://www.ask2live.me/api/hole/read/"+holeId).then(
            (res) => {
                if (res.data.response === "SUCCESS")
                    setMatch(res.data.detail);
            }
        )
    },[holeId])
    
    switch (sessionKind) {
        case LIVE:
            const channelNum = urlSearchParams.get("channelNum");
            if (match) 
            {
                const isHost = (currUser === match.host_username);
                console.log(props.location.state)
                return <LiveSessionContainer holeTitle={match.title} hostName={match.host_username} hostImage={match.host_profile_image} holeId={holeId} channelNum={channelNum} joinPass={props.location.state?.joinPass} isHost={isHost}/>
            }
            else return <p>SessionMatchContainer LOADING</p> 

        case RESERVE:
            if (match)
                return <ReserveToLive holeTitle={match.title} hostName={match.host_username} hostImage={match.host_profile_image} holeId={holeId}/>
            else return <p>SessionMatchContainer LOADING</p> 
            
        default:
            return (
                <p>SessionMatchContainer ERROR</p>     
            )
    }
}

export default SessionMatchContainer