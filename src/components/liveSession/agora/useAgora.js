import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AgoraRTC, {
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
} from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";
import { AirlineSeatReclineExtraOutlined } from "@material-ui/icons";

export default function useAgora(client) {
  console.log("useAgora");
  const appid = "2e5346b36d1f40b1bbc62472116d96de";

  const [localAudioTrack, setLocalAudioTrack] = useState("");

  const [joinState, setJoinState] = useState(false);

  const [remoteUsers, setRemoteUsers] = useState([]);
  const authority = useSelector((state) => state.Authorize);

  const dispatch = useDispatch();

  async function createLocalTracks() {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack(
      MicrophoneAudioTrackInitConfig
    );

    setLocalAudioTrack(microphoneTrack);
    return microphoneTrack;
  }
  
  async function join(channel, token, rtmClient, rtmChannel) {
    console.log("join");

    
    if (!client) return;
    
    const microphoneTrack = await createLocalTracks();
    await client.join(appid, channel, token);    
    
    await rtmClient
    .login({ token: null, uid: String(client.uid) })
        .then(() => {
          console.log("=============== AgoraRTM client login success");
        })
        .catch((err) => {
          console.log("============= AgoraRTM client login failure", err);
        });
        
    rtmClient.on("ConnectionStateChanged", (newState, reason) => {
      console.log(
        "on connection state changed to " + newState + " reason: " + reason
        );
      });
          
    await rtmChannel.join();
      // event listener for receiving a peer-to-peer message.
    await rtmClient.on("MessageFromPeer", (msg, peerId) => {
        // text: text of the received message; peerId: User ID of the sender.
        console.log(
          "AgoraRTM Peer Msg: from user " + peerId + " recieved: \n" + msg.text
        );

        // check if mute or leave command
        if (msg.text === "host") {
          console.log("make host");
          console.log(microphoneTrack);

          microphoneTrack.stop();
          client.publish(microphoneTrack);
          microphoneTrack.setEnabled(true);

        } else if (msg.text === "audience") {
          
          client.unpublish();
          microphoneTrack.play();
          console.log("make audience");
        } else {
          console.log("[Warning] unknown message:");
          console.log(msg);
        }
      });

    // let members;
    // await rtmChannel
    //     .getMembers()
    //     .then((res) => {
    //       members = res;
    //       console.log("GETMEMBERS !!!");
    //       console.log(res);
    //     })
    //     .catch((err) => console.log(err));

    // dispatch({type: "GIVEMEMBER", payload: members});


    if (remoteUsers.length === 0) {
      console.log("client Role in JOIN ");
      await dispatch({type: "superHost", payload: "host"});
      // await client.setClientRole('host');
      await client.publish(microphoneTrack);
    } else {
      console.log("audience Role in JOIN");
      await dispatch({type: "audience"});
      // await client.unpublish();
    }

    //채팅 소켓 만드는 시점 - socket id는 roomname
    // await client.publish([microphoneTrack, cameraTrack]);
    console.log("end useAgora");
    setJoinState(true);
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    // if (localVideoTrack) {
    //   localVideoTrack.stop();
    //   localVideoTrack.close();
    // }
    setRemoteUsers([]);
    setJoinState(false);
    //! leave하면 이상해지더라..
    // await rtmChannel.leave();
    await client.leave();
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);
    
    const handleUserPublished = async (user, mediaType) => {
      console.log("user =========== : ", user);
      console.log("client ============ : ", client);
      // if(user.uid != client.uid){
        console.log("subscirbe USER ~~~ !");
        console.log("subscirbe USER ~~~ !");
        console.log("subscirbe USER ~~~ !");
        console.log("subscirbe USER ~~~ !");
        console.log("subscirbe USER ~~~ !");
        console.log("subscirbe USER ~~~ !");
        await client.subscribe(user, mediaType);
      // }
      console.log("user mediaType: ", mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    
    const handleUserUnpublished = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    
    const handleUserJoined = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };

    const handleUserLeft = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };

    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);

    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
      client.off("user-joined", handleUserJoined);
      client.off("user-left", handleUserLeft);
    };
  }, [client]);

  return {
    localAudioTrack,
    joinState,
    leave,
    join,
    remoteUsers,
    authority,
  };
}
