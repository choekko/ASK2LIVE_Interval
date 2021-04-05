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
    balloonWhite : {
        position: "absolute",
        backgroundImage: "url('/static/Balloon.png')",
        backgroundSize: "contain",
        backgroundRepeat : "no-repeat",
        height : "7em",
        margin : "0.5em 0 ",
        width : "7em",
        transform :"translate(5.3em, 0)",
    },
    balloonColor : {
        backgroundImage: "url('/static/BalloonColor.png')",
        backgroundSize: "contain",
        backgroundRepeat : "no-repeat",
        height : "7em",
        margin : "0.5em 0 ",
        width : "7em",
        transform :"translate(5.3em, 0)",
    },
    mike : {
        position : "absolute",
        width :"2em", 
        height: "2em", 
        margin:"0.7em 0em 0.5em 0.6em",
        backgroundImage: "url('/static/mike.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize : "contain",
        transform :"translate(1.5em, 0.3em)",
    }
}


const SessioinCreateButton = (props) => {
  const history = useHistory();

  return (
    <>
        <Grid container justify="center">
            <div 
            style={props.noMyLive? 
                {backgroundColor: "white"}
                :
                {marginTop:"1.5em", backgroundColor: "#4CC0D0"}
            }
            onClick={() => {
                history.push("/createSession");
            }}
            className="createBtn">
                <Grid container justify="center">
                    <div style={style.textWrap}>
                        <p
                        className="CookieRun"
                        style={props.noMyLive?
                            {color: "#163780", margin : "0 0 0 0", fontSize : "0.9em"}
                            :
                            {color: "white", margin : "0 0 0 0", fontSize : "0.9em"}
                        }>Live Q&A을 개설해서</p>
                        <p
                        className="CookieRun"
                        style={props.noMyLive?
                            {color: "#163780", margin : "0 0 0 0", fontSize : "0.9em"}
                            :
                            {color: "white", margin : "0 0 0 0", fontSize : "0.9em"}
                        }>경험을 나누어 보세요</p>
                        <p
                        className="NanumGothic4"
                        style={props.noMyLive?
                            {color: "#163780", margin : "0.7em 0 0 0", fontSize : "0.6em"}
                            :
                            {color: "white", margin : "0.7em 0 0 0", fontSize : "0.6em"}
                        }>(개설하려면 클릭!)</p>
                    </div>
                    <div style={
                        props.noMyLive?
                        style.balloonColor
                        :
                        style.balloonWhite
                        }>
                        <div
                        style={style.mike}/>
                    </div>
                    </Grid>
            </div>

        </Grid>
    </>
  );
};



// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//       padding: theme.spacing(2),
//     },
//   }));


// const style = {
//     button : {
//         position: 'relative',
//         width: '60%',
//         minWidth : "19em",
//         marginBottom: '20px',
//         backgroundColor: "rgb(255,255,255)",
//         border : "3px solid #F24822"
//     },
//     buttonIcon: {
//         fontSize: 30,
//         color: 'white',
//         backgroundColor: '#F24822',
//         borderRadius: '50%',
//     },
//     buttonText: {
//         align: 'left',
//         fontSize: '1em',
//         margin: '8px',
//     },
// }




{/* <>
<div className={classes.root}>
    <Grid container justify="center">
      <Button
        style={style.button}
        variant="contained"
        color="default"
        endIcon={<AddIcon style={style.buttonIcon} />}
        onClick={() => {
          history.push("/createSession");
        }}
      >
        <div style={style.buttonText} align="left" className="NanumGothic3">
          Live Q&A를 개설해서
          <br></br>
          경험을 함께 나누어보세요
        </div>
      </Button>
    </Grid>
  </div>
  </> */}


export {SessioinCreateButton}
