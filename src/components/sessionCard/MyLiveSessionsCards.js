import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import "../../styles/style.css";
import { SportsEsportsOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 300,
      maxWidth: 500,
    },
    media: {
        cursor: "pointer",
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardContent: {
        height: "50px"
    }
  }));
  

const MyLiveSessionsCard = ({session}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const history = useHistory();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  return (
    <>
    {/* <div className="padding" onClick={() => {history.push({
        pathname: "/session?state=mylive&i_r_d="+ session.roomId + "&channelNum=" + session.channelNum" 
    })}}> */}
    <div className="padding">
        <Card key={session.roomId} className={classes.root}>
            <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                {session.hostName[0]}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings">
                <MoreVertIcon />
                </IconButton>
            }
            title={session.roomName}
            subheader={session.reserveDate}
            />
            <CardMedia
            className={classes.media}
            image={session.imageLink}
            title={session.hostName}
            onClick={()=>{
                history.push("/session/live?roomId=" + session.roomId + "&channelNum=" + session.channelNum)
            }}
            />
            <CardContent className={classes.cardContent}>
                <div className="centered">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {session.roomSubName}
                    </Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
            <IconButton
                className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon/>
            </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>
                    라이브 중
                </Typography>
            </CardContent>
            </Collapse>
        </Card>
        <br />
    </div>
    <br/>
    </>
  );
}

const MyLiveSessionsCards = ({myLiveSessions}) => {
    return (
        <>
            {myLiveSessions.map((session) => (
                <MyLiveSessionsCard session={session} />
            ))}
        </>
    )
}

export default MyLiveSessionsCards;