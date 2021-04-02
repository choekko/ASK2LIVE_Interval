import { useSelector } from "react-redux";
import { useHistory } from "react-router"
import React, {useMemo} from 'react';
import Moment from "react-moment";

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import "../../App.css"
import "../../styles/style.css"

const useStyles = makeStyles({
  root: {
    minWidth: 270,
    borderRadius: "5px",
    boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 10px',
    transform: 'scale(0.8)',
  },
  content : {
    
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
});

const style = {
  title : {
      color: "#030916",
      fontSize: "1.5em",
      paddingLeft : "1em"
  },
  mainOragne: {
      position : "absolute",
      backgroundColor: "#eb4e27",
      height : "15em",
      width: "100%",
      zIndex : "-1",
      overflow: "hidden",
  },
  descript: {
      fontSize: "1.2em",
      color: "white",
      paddingLeft: "1.2em"
  },
  descript2: {
      fontSize: "1.2em",
      color: "#1C418C",
      paddingLeft: "1.2em"
  },
  cookie1: {
      backgroundImage: "url('/static/cookie.png')",
      top : "3em",
      right : "-2.5em",
  },
  cookie2: {
      backgroundImage: "url('/static/cookie.png')",
      top : "-1.5em",
      width: "2em",
      backgroundRepeat: "no-repeat",
      left : "60%",
  },
  button : {
      position: 'relative',
      width: '80%',
      marginBottom: '20px',
  },
  buttonIcon: {
      fontSize: 30,
      fontColor: 'black',
      backgroundColor: '#C0C0C0',
      borderRadius: '50%',
      marginLeft: '150%',
  },
  buttonText: {
      align: 'left',
      fontSize: '80%',
      margin: '8px',
      marginLeft: '-20%',
      fontWeight: 900,
  },
}

const HostConfirmedSessionsCards = ({hostConfirmedSessions}) => {
    const user = useSelector(state => state.user)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>?</span>;
    const history = useHistory();
    return (
      <>
        {hostConfirmedSessions.map((session) => 
        <>
        <div>
            <Card key={session.livehole_id} className={classes.root}>
                <CardContent>
                <div className={classes.cursor} onClick={()=>{
                  if(Object.keys(user.data).length === 0){
                    alert('로그인이 필요합니다.')
                  }else{
                    alert('아직 라이브 Q&A가 시작하지 않았어요')
                  }
                }}>
                    <p style={style.descript2} className="NanumGothic3" variant="h" component="h2">
                        {session.title}
                    </p>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        시작 시간 : {
                            <>
                            <Typography variant="body2">
                            <Moment format="MM.DD hh시 mm분">
                            {session.reserve_date}
                            </Moment>
                            </Typography>
                            </>}
                    </Typography>
                    <Typography className={classes.bullet} color="textSecondary">
                        {session.host_username} <br />
                    </Typography>
                </div>
                </CardContent>
            </Card>
        </div>
        <br/>
        </>
        )}
        <br/>
      </>
    );
}

export default HostConfirmedSessionsCards;