import React, {useState} from 'react';
import {useHistory, withRouter} from "react-router-dom"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CardContent from '@material-ui/core/CardContent';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width : "94%",
    maxWidth: "23em",
    height: "11em"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
},
cover: {
    width: "20px",
    borderLeft: "solid rgba(0, 0, 0, 0.3) 1px"
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  top : {
      position : "fixed",
      top: "30%"
  }
}));

const JoinCard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [mike, setMike] = useState(0);

  const getMike = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log('You let me use your mic!')
        setMike(1);
      })
      .catch(function(err) {
        history.push('/');
      });
  }

  return (
<Grid className={classes.top} container justify="center">
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {props.hostName}
          </Typography>
          {props.isHost ?  
          <p className="NanumGothic3">
            {props.hostName}님의 라이브를 켭니다
            {mike? <p>마이크 설정 완료</p> : <><p>마이크를 허용해주세요.</p> <button onClick={getMike}>허용</button></>}
          </p>    
            :
          <h4 className="NanumGothic3">
            {props.hostName}님의 방에 입장합니다
            {mike? <p>마이크 설정 완료</p> : <><p>마이크를 허용해주세요.</p> <button onClick={getMike}>허용</button></>}
          </h4>
            }
        </CardContent>
        <div>
          {console.log(props.isHost)}
            {props.isHost ?
                mike?
                    <button 
                    onClick={()=>{
                        history.push({
                            pathname : "/session/live",
                            search: "?holeId=" + props.holeId + "&channelNum=" + props.channelNum,
                            state : {
                                joinPass : true,
                                isHost : true,
                                hostName : props.hostName,
                                hostImage: props.hostImage,
                            }
                        })
                    }}
                    style={{margin:"0 0 1em 2em"}}
                    >라이브열기</button>
                :
                <></>
            :   
                mike?
                <IconButton onClick={()=>props.setJoin(1)} aria-label="play/pause">
                    <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                :
                <></>
            }
        </div>
      </div>
    </Card>

</Grid>
  );
}

export default withRouter(JoinCard)