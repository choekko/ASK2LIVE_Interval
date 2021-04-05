import { useHistory } from 'react-router';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import "../App.css"

const style = {
    textWrap : {
        position: "absolute",
        // backgroundColor: "pink",
        height : "4em",
        margin : "1em 0.5em",
        width : "9em",
        transform :"translate(-1.7em, 0)",
    },
    profileBalloon : {
        position: "absolute",
        backgroundImage: "url('/static/profileBalloon.png')",
        backgroundSize: "contain",
        backgroundRepeat : "no-repeat",
        height : "7em",
        margin : "0.5em 0 ",
        width : "7em",
        transform :"translate(5.3em, 0)",
    },
}


const ProfileEditButton = (props) => {
  const history = useHistory();

  return (
    <>
        <Grid container justify="center">
            <div 
            style={
                {marginTop:"1.5em", backgroundColor: "#4CC0D0"}
            }
            onClick={() => {
                history.push("/mypage/" + props.userName + "/edit");
            }}
            className="createBtn">
                <Grid container justify="center">
                    <div style={style.textWrap}>
                        <p
                        className="CookieRun"
                        style={
                            {color: "white", margin : "-3px 0 0 0", fontSize : "0.9em"}
                        }>프로필을 완성해보세요!</p>
                        <p
                        className="NanumGothic2"
                        style={
                            {color: "white", margin : "0.7em 0 0 0", fontSize : "0.6em"}
                        }>프로필을 완성하면</p>
                        <p
                        className="NanumGothic2"
                        style={
                            {color: "white", margin : "2px 0 0 0", fontSize : "0.6em"}
                        }>많은 관심을 끌 수 있어요!</p>
                        <p
                        className="NanumGothic3"
                        style={
                            {color: "white", margin : "4px 0 0 0", fontSize : "0.6em"}
                        }>(프로필 편집하려면 클릭!)</p>
                    </div>
                    <div style={
                        style.profileBalloon
                        }>
                    </div>
                    </Grid>
            </div>

        </Grid>
    </>
  );
};

export default ProfileEditButton