import { postSessionDelete } from '../../actions/SessionDeleteActions'
import { SessionConfirm } from './SessionConfirm'
import { useHistory } from "react-router"
import React, { useState } from "react"
import axios from "axios"

import CardContent from "@material-ui/core/CardContent"
import CardActions from '@material-ui/core/CardActions'
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { makeStyles } from "@material-ui/core/styles"
import CardHeader from "@material-ui/core/CardHeader"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { red } from "@material-ui/core/colors"
import Button from '@material-ui/core/Button'
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import "../../styles/style.css"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "3%",
    maxWidth: "50em",
    borderRadius: "20px",
    boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
  },
  media: {
    cursor: "pointer",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    height: "30px",
  },
  cookieWrapper: {
    float: "left",
    width: "6em",
    height: "6em",
    marginLeft: "1em",
    backgroundPosition: "center center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  useCookie: {
    float: "left",
    margin: "auto",
    backgroundImage: "url('/static/cookieMould.png')",
    backgroundPosition: "center center",
    backgroundSize: "100%",
    width: "6em",
    height: "6em",
    overflow: "hidden",
  },

}));

const MypageLiveSession = ({ session }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const [listup, setListUp] = useState({ transform: "translate(0, 100%)" });
  const [dark, setDark] = useState({ display: "none" });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const onClick = (choice) => () => {
    if (choice === 'confirm'){
        console.log("onCLICK!");
        
        <SessionConfirm/>
        
  
      }
      else if (choice === 'delete') {
        console.log(session);
        console.log("DELETE SESSION!");
        postSessionDelete(session[0]);
        history.push('/mypage');
      }
    };

  return (
    <>
      {/* <div className="padding" onClick={() => {history.push({
        pathname: "/session?state=mylive&i_r_d="+ session.roomId + "&channelNum=" + session.channelNum" 
    })}}> */}
    <Grid container justify="center">
        <Card key={session.livehole_id} className={classes.root}>
        {/* <CardActionArea onClick={onClick}> */}
          <br />
          <div
            style={{ backgroundImage: "url('/static/live_IU2.png')" }}
            className={classes.cookieWrapper}
          >
            <div className={classes.useCookie}></div>{" "}
          </div>
          {/* <CardMedia
            className={classes.media}
            image={"/static/live_IU.png"}
            title={session.title}
            onClick={()=>{
                history.push("/session/live?roomId=" + session.livehole_id + "&channelNum=" + session.livehole_id)
            }}
        /> */}


          <CardHeader
            // avatar={
            //   <Avatar aria-label="recipe"
            //   src="../static/live_IU2.png"
            //   className={classes.useCookie}>
            //     {session.host_nickname}
            //   </Avatar>
            // }
            title={<Typography variant="h6">{session[0].title}</Typography>}
            subheader={Date(session.reserve_date).substring(0, 21)}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            // title={session.title}
          />
              <CardContent>
          <CardActions>

        <Button size="large" color="primary" onClick={()=>{setListUp({transform : "translate(0, 50%)"}); setDark({animation: "godark 0.7s"})}}>
        <Typography variant="body1" style={{ fontWeight: 600 }}>예약 확정하기</Typography>
        </Button>
        <Button size="large" color="primary" onClick={onClick('delete')}>
        <Typography variant="body1" style={{ fontWeight: 600 }}>삭제하기</Typography>
        </Button>


      </CardActions>
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
        {/* </CardActionArea> */}
        </Card>
        </Grid>
        <br />
        <div style={listup} className="hiddenlist" maxWidth="">
            <SessionConfirm session={session} goListUp={setListUp} goDark={setDark}/>
        </div>
        <div style={dark} className="layerfordark"></div>

      <br />
    </>
  );
};

export default MypageLiveSession;
