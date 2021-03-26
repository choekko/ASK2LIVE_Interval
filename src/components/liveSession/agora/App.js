import React, { useState } from "react";

import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";

// import useAgora from "../../hooks/useAgora";

// import "./Call.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import PlayerWrapper from "./PlayerWrapper";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { isConstructorDeclaration } from "typescript";

const appid = "2e5346b36d1f40b1bbc62472116d96de";
const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
const rtmClient = AgoraRTM.createInstance(appid);

const App = ({ authorize }) => {
  let rtmChannel;
  const [channel, setChannel] = useState();

  const {
    localAudioTrack,
    // localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
    authority,
  } = useAgora(client);

  const onChange = (e) => {
    setChannel(e.target.value);
  };

  const onClick = (choice) => () => {
    if (choice === "join") {
      console.log("join");
      rtmChannel = rtmClient.createChannel(channel);
      
      join(channel, authorize, null, rtmClient, rtmChannel);

    } else if (choice === "leave") {
      console.log("leave");
      rtmClient.logout();
      leave();
    }
  };

  const handleSubmit = (e) => {
    alert("value - " + channel);
    e.preventDefault();
  };


  console.log("채널 번호: ", channel);

  return (
    <div className="call">
      <div className="centered">
        <form className="call-form item" onSubmit={handleSubmit}>
          <label>
            <b> Session: </b>
            <input type="text" name="channel" onChange={onChange} />
          </label>

          <div className="button-group">
            <button
              id="join"
              type="button"
              className="btn btn-primary btn-sm"
              disabled={joinState}
              onClick={
                onClick("join")
                //setChannelList(channel);
              }
            >
              Join
            </button>
            <button
              id="leave"
              type="button"
              className="btn btn-primary btn-sm"
              disabled={!joinState}
              onClick={
                onClick("leave")
                // rtmClient.leave()
              }
            >
              Leave
            </button>
          </div>
          <PlayerWrapper
            client={client}
            rtmClient={rtmClient}
            host={authority}
            localAudioTrack={localAudioTrack}
            remoteUsers={remoteUsers}
            // authorize={authorize}
            channelNum={channel}
          />
        </form>
      </div>
      {/* <b> */}
      {/* {JSON.stringify(joinState) === "joined"
          ? "No One is Here"
          : "Welcome to the '" + channel + "' Room"}
      </b>{" "} */}
      <br />
      {/* <b> Local Video: {JSON.stringify(localVideoTrack)}</b> <br />
      <b> Remote Video: {JSON.stringify(remoteUsers)}</b> */}
      <br />
      <div>
        {/* <Route excat path='/live/{channel}' render={() => <PlayerWrapper client={client} joinState={joinState} localAudioTrack={localAudioTrack} remoteUsers={remoteUsers} authoriz={authorize}/>}/> */}
        {/* <PlayerWrapper client={client} /> */}
      </div>
    </div>
  );
};

export default withRouter(App);
