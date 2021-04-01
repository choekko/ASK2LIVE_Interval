import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MediaPlayer(props) {

  const { audioTrack, client } = props;

  const authority = useSelector((state) => state.Authorize);

  useEffect(() => {
    console.log("mediaPlayer useEffect !!!! ", authority);

    if (audioTrack && client.remoteUsers.length === 0) {
      console.log("여기는 호스트");

      audioTrack.setEnabled(true);

      return () => {
        audioTrack.setEnabled(false);
        audioTrack.stop();
      };
    }

    else if(audioTrack && client.remoteUsers.length != 0) {
      console.log("여기는 게스트");

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
}
