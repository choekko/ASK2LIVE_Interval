import { useHistory } from "react-router"
import React, {useMemo} from 'react';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 270,
    borderRadius: "20px",
    boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
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
      <div className={classes.title}>
        <h2>진행 중인 라이브 Q&A</h2>
        </div>
        {otherLiveSessions.map((session) => 
        <>
        <div className={classes.padding}>
            <Card key={session.livehole_id} className={classes.root}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    시작 시간 : {Date(session.reserve_date).substring(0, 21)}
                </Typography>
                <div className={classes.cursor} onClick={()=>{
                  if(Object.keys(user.data).length === 0){
                    alert('로그인하세요')
                  }else{
                    history.push({
                      pathname: "/session/live",
                      search: "?holeId=" + session.id + "&channelNum=" + session.livehole_id,
                      state : {
                          hostName : session.host_nickname,
                          hostImage : session.host_profile_image,
                      }
              })
                  }
                }}>
                    <Typography variant="h5" component="h2">
                        {session.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {session.host_nickname}
                    </Typography>
                    <Typography variant="body2" component="p">
                        라이브 중인 다른 방입니다.
                    </Typography>
                </div>
                </CardContent>
                <CardActions>
                <Button size="small">Learn More</Button>
                </CardActions>
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
