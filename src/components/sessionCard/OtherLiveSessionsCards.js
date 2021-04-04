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

const style = {

  descript2: {
      fontSize: "1.2em",
      color: "#1C418C",
      paddingLeft: "1.2em"
  },
  card: {
    color: "#F24822"
  }

}

const useStyles = makeStyles({
  root: {
    minWidth: 270,
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
  }
});

const OtherLiveSessionsCards = ({otherLiveSessions}) => {
    const user = useSelector(state => state.user)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>?</span>;
    const history = useHistory();
  
    return (
      <>
        {otherLiveSessions.map((session) => 
        <>
        <div className={classes.padding}>
            <Card key={session.livehole_id} className={classes.root}>
                <CardContent>
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
                    <p style={style.descript2} className="NanumGothic3">
                        {session.title}
                    </p>
                    <Typography className={classes.pos} color="textSecondary">
                        {session.host_username}
                    </Typography>
                    <p style={style.card} className="cardInfo">
                        라이브 중인 방입니다.
                    </p>
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
