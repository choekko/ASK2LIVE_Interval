import React, {useMemo} from 'react';
import { useHistory } from "react-router"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cursor: {
      cursor: "pointer"
  }
});

const OtherLiveSessionsCards = ({otherLiveSessions}) => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>?</span>;
    const history = useHistory();
  
    return (
      <>
        {otherLiveSessions.map((session) => 
        <>
        <div className="padding">
            <Card key={session.roomId} className={classes.root}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    시작 시간 = {session.reserveDate}
                </Typography>
                <div className={classes.cursor} onClick={()=>{
                history.push("/session/live?roomId=" + session.roomId + "&channelNum=" + session.channelNum)
                }}>
                    <Typography variant="h5" component="h2">
                        {session.roomName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {session.hostName}
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
