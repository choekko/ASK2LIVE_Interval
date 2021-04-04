import { useLocation, withRouter } from "react-router-dom";
import React, { useCallback } from "react";
import MediaPlayer from "./MediaPlayer";

// import "../../Call.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const PlayerWrapper = ({
  client,
  rtmClient,
  host,
  joinState,
  localAudioTrack,
  remoteUsers,
  channelNum,
}) => {
  // const [members, setMembers] = useState([])

  const sendP2PMessage = useCallback((recipientUID, peerMsg) => {
    console.log("sendP2PMessage");

    // An RtmMessage object.
    const remoteUID = String(recipientUID);

    // p2p message
    console.log("리모트 UID: ", remoteUID);
    console.log("리모트 msg: ", peerMsg);

    if (peerMsg) {
      rtmClient
        .sendMessageToPeer({ text: peerMsg }, remoteUID)
        .then((sendResult) => {
          if (sendResult.hasPeerReceived) {
            console.log("peer recieved " + peerMsg + " successfully");

          } else {
            console.log("peer did not recieved " + peerMsg + " unlog");
          }
        })
        .catch((error) => {
          console.log("RTM message recieved err");
        });
    }
  }, []);

  // setLiveIndex(sessionDummy.findIndex(e => e.channelNum === parseInt(channelNum)))
  // const liveIndex = sessionDummy.findIndex(e => e.channelNum === parseInt(channelNum));
  // const Live = sessionDummy.filter(session => String(session.channelNum) === channelNum);
  // liveIndex != -1 ? console.log("라이브유저: ", sessionDummy[liveIndex].liveUsers) : console.log("sorry");

  // const location = useLocation()

  // const isChannel = (element) => {
  //     if(element.channelNum === channelNum){
  //         return true;
  //     }
  // }

  return (
    <>
      <div className="player-container">
        {/* <div> {client.uid} </div> */}
        <div className="local-player-wrapper">
          {/* <p className="local-player-text">
            {localAudioTrack && `localTrack`}
            {joinState && localAudioTrack ? `(${client.uid})` : ""}
            {console.log("클라이언트:", client)}
          </p> */}

          <MediaPlayer
            audioTrack={localAudioTrack}
            client={client}
          />
        </div>
        <div className="remotePlayers">
          {remoteUsers.map((user) => (
            <div className="remote-player-wrapper" key={user.uid}>
              {/* <p>Remote Player + {user.uid} </p>
              <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p>

              <button onClick={() => sendP2PMessage(user.uid, "host")}>
                {" "}
                host 만들기{" "}
              </button>
              <button onClick={() => sendP2PMessage(user.uid, "audience")}>
                {" "}
                audience 만들기{" "}
              </button> */}

              <MediaPlayer audioTrack={user.audioTrack} client={client} />
            </div>
          ))}
        </div>

        {/* <div>
                {members.map((i) => (
                    <div key={i}>
                        {i}
                    </div>
                ))
                }
            </div> */}
      </div>
    </>
  );
};

export default withRouter(PlayerWrapper)