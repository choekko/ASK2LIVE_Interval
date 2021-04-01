import { useHistory } from 'react-router';
import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import "../../styles/style.css";


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 250,
      maxWidth: 500,
      borderRadius: "20px",
      boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
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
        height: "30px"
    },
    cookieWrapper: {
        display : "block",
        width: "6em",
        height: "6em",
        marginLeft: "1em",
        backgroundPosition : "center center",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",

        
    },
    useCookie: {
        position: "absolute",
        margin: "auto",
        backgroundImage: "url('/static/cookieMould.png')",
        backgroundPosition : "center center",
        backgroundSize: "100%",
        width: "6em",
        height : "6em",
        overflow: "hidden",
    },
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
    <div 
    className="padding" 
    onClick={()=>{
                history.push({
                    pathname: "/session/live",
                    search: "?holeId=" + session.id + "&channelNum=" + session.livehole_id,
                    state : {
                        hostName : session.host_username,
                        hostImage : session.host_profile_image,
                    }
            })}}
    style={{cursor:"pointer"}}>
        <Card key={session.livehole_id} className={classes.root}>
            <br/>
            <div
            style={{backgroundImage: "url('/static/live_IU2.png')"}}
            className={classes.cookieWrapper}

            ><div className={classes.useCookie}></div> </div>
            {/* <CardMedia
            className={classes.media}
            image={"/static/live_IU.png"}
            title={session.title}
            onClick={()=>{
                history.push("/session/live?roomId=" + session.livehole_id + "&channelNum=" + session.livehole_id)
            }}
            /> */}
            <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                {session.host_username}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings">
                <MoreVertIcon />
                </IconButton>
            }
            title={session.title}
            subheader={Date(session.reserve_date).substring(0,21)}
            />
            <CardContent className={classes.cardContent}>
                <div className="centered">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {session.description}
                    </Typography>
                </div>
            </CardContent>
            {/* <CardActions disableSpacing>
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
            </Collapse> */}
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
                <>
                <MyLiveSessionsCard session={session} />
                </>
            ))}
        </>
    )
}

export default MyLiveSessionsCards;