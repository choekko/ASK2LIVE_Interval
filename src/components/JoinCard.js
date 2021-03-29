import React from 'react';
import {useHistory, withRouter} from "react-router-dom"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width : "94%",
    maxWidth: "23em",
    height: "13em"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
},
cover: {
    width: 151,
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



  return (
<Grid className={classes.top} container justify="center">
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.hostName}
          </Typography>
          {props.isHost ?  
          <h3 className="NanumGothic3">
            {props.hostName}님의 라이브를 엽니다
          </h3>    
            :
          <h3 className="NanumGothic3">
            {props.hostName}님의 방에 입장합니다
          </h3>
            }
        </CardContent>
        <div className={classes.controls}>
            {props.isHost ?
            <button onClick={()=>{
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
            }}>라이브열기</button>
            :        
            <IconButton onClick={()=>props.setJoin(1)} aria-label="play/pause">
                <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            }
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.hostImage}
        title="Live from space album cover"
      />
    </Card>

</Grid>
  );
}

export default withRouter(JoinCard)