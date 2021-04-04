import { useHistory } from "react-router"
import React, {useMemo} from 'react';
import Moment from "react-moment";

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: "17em",
    borderRadius: "5px",
    borderBottom : "0.4px solid #3B568C",
    boxShadow: "0px 0px 2px 0px rgb(0, 0, 0, 0.3)",
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

});

const style = {
    imageWrapper : {
        display : "inline-block",
        position : "relative",
        width : "5em",
        height : "10em",
        backgroundColor : "skyblue",
    },
    content : {
        display : "inline-block",
        position : "relative",
        width : "10em",
        height : "10em",
        backgroundColor : "black",
    },
    buttonWrapper : {
        width : "5em",
        height : "5em",
        backgroundColor : "pink",
    },
    profileimage : {
        width : "5em",
        height : "5em",
        backgroundColor : "red",
    }
}

const OtherLiveSessionsCards = ({otherLiveSessions}) => {
    const user = useSelector(state => state.user)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>?</span>;
    const history = useHistory();
  
    let now = new Date();

    const toDate = (reserve_date) => {
        let date = new Date(reserve_date);
        return date;
    } 


    return (
      <>
        {otherLiveSessions.map((session) => 
        <>
        <div className={classes.padding}>
            <Card key={session.livehole_id} className={classes.root}>
                <CardContent>
                <div style={style.imageWrapper}>
                <div style={style.profileimage}/>
                <div style={style.buttonWrapper}/>
                </div>
                <div style={style.content}/>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {
                        <>
                        <Typography variant="body2">
                        {console.log(toDate(session.reserve_date))}
                        <Moment format="h시간 mm분 전 시작">
                        {toDate(session.reserve_date) - now}
                        </Moment>
                        </Typography>
                        </>}
                </Typography>
                <div className={classes.cursor} onClick={()=>{
                  if(Object.keys(user.data).length === 0){
                    alert('로그인이 필요합니다.')
                  }else{
                    history.push({
                      pathname: "/session/live",
                      search: "?holeId=" + session.id + "&channelNum=" + session.livehole_id,
                      state : {
                          hostName : session.host_username,
                          hostImage : session.host_profile_image,
                      }
              })
                  }
                }}>
                    <Typography variant="h5" component="h2">
                        {session.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {session.host_username}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <p style={{margin:"0", color:"#D95032"}}> 라이브 중인 방입니다.</p>
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

export default OtherLiveSessionsCards;
