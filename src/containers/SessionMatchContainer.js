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
        axios.get("https://143.248.226.51:8000/api/hole/read/"+holeId).then(
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
                const isHost = (currUser === match.host_nickname);
                return <LiveSessionContainer holeTitle={match.title} hostName={match.host_nickname} hostImage={match.host_profile_image} holeId={holeId} channelNum={channelNum} joinPass={props.location.state?.joinPass} isHost={isHost}/>
            }
            else return <p>SessionMatchContainer LOADING</p> 

        case RESERVE: // ���� ȣ��Ʈ�� ���İ���
            if (match)
                return <ReserveToLive holeTitle={match.title} hostName={match.host_nickname} hostImage={match.host_profile_image} holeId={holeId}/>
            else return <p>SessionMatchContainer LOADING</p> 
            
        default:
            return (
                <p>SessionMatchContainer ERROR</p>     
            )
        }
    // switch (sessionKind) {
    //     case LIVE:
    //         const holeId = urlSearchParams.get("holeId");
    //         const channelNum = urlSearchParams.get("channelNum");
    //         axios.get("https://143.248.226.51:8000/api/hole/read/"+holeId).then(
    //             (res) => {
    //                 if (res.data.response === "SUCCESS")
    //                 {
    //                     const isHost = (currUser === res.data.detail.host_nickname);
    //                     return <LiveSessionContainer hostName={res.data.detail.host_nickname} hostImage={res.data.detail.host_profile_image} holeId={holeId} channelNum={channelNum} joinPass={props.location.state?.joinPass} isHost={isHost}/>
    //                 }
    //                 else return <p>SessionMatchContainer GET ERROR</p> 
    //             }
    //         )
    //     case RESERVE: // ���� ȣ��Ʈ�� ���İ���
    //         const holeId_reserve = urlSearchParams.get("holeId");
    //         console.log(holeId_reserve)
    //         axios.get("https://143.248.226.51:8000/api/hole/read/"+holeId).then(
    //             (res) => {
    //                 if (res.data.response === "SUCCESS")
    //                 {
    //                     return <ReserveToLive hostName={res.data.detail.host_nickname} hostImage={res.data.detail.host_profile_image} holeId={holeId_reserve}/>
    //                 }
    //                 else return <p>SessionMatchContainer GET ERROR</p> 
    //             }
    //         )
    //     default:
    //         return (
    //             <p>SessionMatchContainer ERROR</p>     
    //         )
    //     }
}

export default SessionMatchContainer