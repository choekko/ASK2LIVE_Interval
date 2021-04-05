import { useSelector } from "react-redux";
import { useHistory } from "react-router"
import React, {useMemo, useState} from 'react';
import Moment from "react-moment";

import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import MuiAlert from '@material-ui/lab/Alert';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import HelpIcon from '@material-ui/icons/HelpOutline';
import Snackbar from '@material-ui/core/Snackbar';
import "../../App.css"
import "../../styles/style.css"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
  root: {
    width: "17em",
    height: "10.5em",
    borderBottom : "0.4px solid #3B568C",
    borderRadius: "0px",
    boxShadow: "0 0 0 0",
    backgroundColor : "rgba(255,255,255,0)"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 10px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    width: "100%",
    display:"flex",
    justifyContent:"center",
    paddingBottom: "1em",
    
  },
  pos: {
    marginBottom: 12,
  },
  cursor: {
      cursor: "pointer"
  },
  padding : {
    padding: "2%",
  },
  avatarRoot: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    border : "1px solid rgba(0,0,0,0.3)",
  },

}));

const style = {
    imageWrapper : {
        display : "inline-block",
        width : "6em",
        height : "10em",
        // backgroundColor : "skyblue",
    },
    content : {
        display : "inline-block",
        float : "right",
        width : "9em",
        height : "10em",
        // backgroundColor : "skyblue",
    },
    contentTime: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        width : "inherit",
        height : "1.5em",
        // backgroundColor : "coral",
    },
    contentTitle: {
        width : "9em",
        height : "4em",
        textOverflow: "ellipsis",
        // backgroundColor : "grey",
        margin: "4px 0px 0px 0px",
    },
    contentName: {
        width : "inherit",
        height : "1.5em",
        // backgroundColor : "yellow",
    },
    contentField: {
        width : "inherit",
        height : "1.5em",
        // backgroundColor : "green",
    },
    buttonWrapper : {
        width : "6em",
        height : "4em",
        // backgroundColor : "pink",
        overflow: "auto",
    },
    profileimage : {
        width : "6em",
        height : "6em",
    },
    livelogo1: {
        backgroundImage : "url('/static/Live_1.png')",
        backgroundSize : "contain",
        width : "40px",
        height: "25px",
        transform: "translate(2.1em, -2.1em)",
        zIndex : "3",
    },
    livelogo1_back: {
        backgroundColor: "white",
        backgroundSize : "contain",
        width : "22px",
        height: "12px",
        transform: "translate(2.7em, -1em)",
        zIndex : "0",
    }
}

const HostConfirmedSessionsCards = ({hostConfirmedSessions}) => {
    const user = useSelector(state => state.user)
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("제목");
    const [subtitle, setSubtitle] = useState("제목");
    const [reserveDate, setReserveDate] = useState("시작");
  
    const handleClick = () => {       
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let now = new Date();

    const toDate = (reserve_date) => {
        let date = new Date(reserve_date);
        return date;
    } 


    return (
      <>
        {hostConfirmedSessions.map((session) => 
        <>
        <div className={classes.padding}>
            <Card key={session.livehole_id} className={classes.root}>
                <CardContent style={{padding : "5px 5px 20px 5px", backgroundColor : "rgba(255,255,255,0)"}}>
                <div style={style.imageWrapper}>
                <div style={style.profileimage}>
                     <div className={classes.avatarRoot}>
                        <Avatar alt="Remy Sharp" src="/static/reigns/2.jpg" className={classes.large} />
                    </div>
                </div>
                <div style={style.buttonWrapper}>
                    <div 
                    style={{posision: "absolute",width:"5em", paddingLeft:"0.9em",marginTop:"1.2em"}}>
                    <Grid container justify="center">
                        <HelpIcon 
                        onClick={()=>{
                            setTitle(session.title);
                            setSubtitle(session.description);
                            setReserveDate(<>
                                <Moment format="MM월 DD일 A h:mm">
                                     {toDate(session.reserve_date)}
                                </Moment>
                                </>);
                            handleClick();
                        }}
                        style={{color: "rgba(255,255,255,0.9)", borderRadius: "100%", padding : "2px", backgroundColor: "#1C418C" }}/>

                    </Grid>
                    </div>
                </div>
                </div>
                <div style={style.content}>
                    <div style={style.contentTitle}>
                        <div className="contentTitle">
                            <span className="BMDOHYEON" style={{color: "#1C418C", fontSize: "1.1em"}}>
                                {session.title}
                            </span>
                        </div>
                    </div>
                    <div style={style.contentTime}>
                        <span 
                        className="NanumGothic3 fontGradi"
                        style={{fontSize: "0.9em", color: "black"}}>
                        <Moment format="MM.DD A h:mm">
                            {toDate(session.reserve_date)}
                        </Moment>
                        </span>
                    </div>
                    <div style={style.contentName}>
                        <span className= "NanumGothic3" style={{fontSize : "0.8em"}}>
                            {session.host_username}
                        </span>
                    </div>
                    <div style={style.contentField}>
                        <span className= "NanumGothic3" style={{color: "rgba(0, 0, 0, 0.5)", fontSize : "0.8em"}}>
                            {session.host_work_company ? 
                            <>
                             {session.host_work_company} |
                            </>
                             : null}
                            {session.host_work_field ? 
                            <>
                             {session.host_work_field}
                            </>
                             : null}
                             {
                                !session.host_work_company && !session.host_work_field ?
                                <>ASK2LIVE | Live Q&A</>
                                :
                                <></>
                             }
                        </span>
                    </div>
                </div>
                </CardContent>
            </Card>
        </div>
        <br/>
        </>
        )}
        <br/>
        <Snackbar 
                style={{position:"fixed", top: "0%"}}
                open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert 
                    style={{color: "black", backgroundColor:"white"}}
                    onClose={handleClose} severity="error">
                    <span className="BMJUA">제목 :</span> {title} <br/>
                    <span className="BMJUA">설명 :</span> {subtitle} <br/>
                    <span className="BMJUA">시작 :</span> {reserveDate}
                    </Alert>
        </Snackbar>
      </>
    );
}



// const useStyles = makeStyles({
//   root: {
//     minWidth: 270,
//     borderRadius: "5px",
//     boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
//   },
// });

// const style = {

//   descript2: {
//       fontSize: "1.2em",
//       color: "#1C418C",
//       paddingLeft: "1.2em"
//   },

// }

// const HostConfirmedSessionsCards = ({hostConfirmedSessions}) => {
//     const user = useSelector(state => state.user)
//     const classes = useStyles();
//     const bull = <span className={classes.bullet}>?</span>;
//     const history = useHistory();
//     return (
//       <>
//         {hostConfirmedSessions.map((session) => {
//           console.log(session.reserve_date)
//           let reserve_date = new Date(session.reserve_date)
//           return (
//             <>
//         <div>
//             <Card key={session.livehole_id} className={classes.root}>
//                 <CardContent>
//                 <div className={classes.cursor} onClick={()=>{
//                   if(Object.keys(user.data).length === 0){
//                     alert('로그인이 필요합니다.')
//                   }else{
//                     alert('아직 라이브 Q&A가 시작하지 않았어요')
//                   }
//                 }}>
//                     <p style={style.descript2} className="NanumGothic3" variant="h" component="h2">
//                         {session.title}
//                     </p>
//                     <Typography className={classes.title} color="textSecondary" gutterBottom>
//                         시작 시간 : {
//                             <>
//                             <Typography variant="body2">
//                             <Moment format="MM.DD hh시 mm분">
//                             {session.reserve_date}
//                             </Moment>
//                             </Typography>
//                             </>}
//                     </Typography>
//                     <Typography className={classes.bullet} color="textSecondary">
//                         {session.host_username} <br />
//                     </Typography>
//                 </div>
//                 </CardContent>
//             </Card>
            
//         </div>
//         <br/>
//         </>
//           )
//         }
//         )}
//         <br/>
//       </>
//     );
// }

export default HostConfirmedSessionsCards;