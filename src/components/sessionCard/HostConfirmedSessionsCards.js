import { useHistory } from "react-router"
import React, {useMemo} from 'react';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  root: {
    minWidth: 270,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 10px',
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
  },
  padding : {
    padding: "2%",
  }
});

const HostConfirmedSessionsCards = ({hostConfirmedSessions}) => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>?</span>;
    const history = useHistory();
  
    return (
      <>
        {hostConfirmedSessions.map((session) => 
        <>
        <div className={classes.title}>
        <h2>진행 예정인 라이브 Q&A</h2>
        </div>
        <div className={classes.padding}>
            <Card key={session.livehole_id} className={classes.root}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    시작 시간 = {Date(session.reserve_date)}
                </Typography>
                <div className={classes.cursor} onClick={()=>{
                history.push("/session/live?roomId=" + session.livehole_id + "&channelNum=" + session.livehole_id)
                }}>
                    <Typography variant="h5" component="h2">
                        {session.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {session.host_nickname}
                    </Typography>
                    <Typography variant="body2" component="p">
                        라이브 예정인 방입니다.
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

export default HostConfirmedSessionsCards;