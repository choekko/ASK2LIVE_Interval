import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxWidth: "70em",
  },
  profile: {
    flexGrow: 1,
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    maxWidth: "50em",
    // margin: "5%",
    display: "flex",
    height: 80,
    alignItems: "center",
    // justifyContent: 'center',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    textAlign: "",
  },
}));


const ProfileGate = (props) => {
    console.log(props.user.pk);
    const classes = useStyles();
    const history = useHistory();

    const goToDetail = () => {
        console.log('onClick');
        history.push(`mypage/${props.user.nickname}`);
    }

  return (
    <>
      <div>
        <h2>My</h2>
      </div>
      <Grid container justify="center">
        <Card className={classes.profile}>
          <CardActionArea onClick={goToDetail}>
            {/* <CardActions > */}
            <CardHeader
              fontSize="large"
              avatar={
                <Avatar
                  aria-label="recipe"
                  src="../static/live_IU2.png"
                  // className={classes.avatar}
                  className={classes.large}
                ></Avatar>
              }
              // titleTypographyProps={{variant:'h1' }}
              title={<Typography variant="h6">{props.user.nickname}</Typography>}
              // subheader="September 14, 2016"
            />
            {/* </CardActions> */}
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default ProfileGate;
