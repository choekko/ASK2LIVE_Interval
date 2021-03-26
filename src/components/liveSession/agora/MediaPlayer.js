import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MediaPlayer(props) {
  //   const container = useRef(null);

  const { audioTrack, client } = props;

  const authority = useSelector((state) => state.Authorize);
  console.log("PlayerWrapper useSelector !!!! ", authority);

  useEffect(() => {
    console.log("mediaPlayer useEffect !!!! ", authority);
    if (audioTrack && client.remoteUsers.length === 0) {
      console.log("여기는 호스트");
      // audioTrack.stop();
      audioTrack.setEnabled(true);
      return () => {
        audioTrack.stop();
      };
    }
    else if(audioTrack) {
      console.log("여기는 게스트");

      // audioTrack.setEnabled(true);
      audioTrack.play();
      return () => {
        audioTrack.stop();
      };
    }
  }, [audioTrack]);

  return (
    <div className="video-player">
      {/* {JSON.stringify(videoTrack.play)} */}
    </div>
  );
  //   return;
}
