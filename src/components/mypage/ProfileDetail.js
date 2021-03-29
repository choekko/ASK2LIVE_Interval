import { useHistory } from "react-router-dom";
import { MypageNav } from "./MypageNav";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "5%",
    left: 0,
    right: 0,
    height: "35%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    maxWidth: "70em",
    margin: "auto",
  },
  root2: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    maxWidth: "70em",
    margin: "2% auto",
  },
  avatar: {
    float: "left",
    top: "30%",
    left: "70%",
    width: theme.spacing(10),
    height: theme.spacing(10),
    // textAlign: "",
  },
  nickname: {
    position: "absolute",
    fontFamily: "BMDOHYEON",
    fontSize: "1.2em",
    top: "30%",
    left: "10%",
    //   width: theme.spacing(10),
    //   height: theme.spacing(10),
    // textAlign: "",
  },
  work_company: {
    position: "absolute",
    fontFamily: "BMJUA",
    top: "45%",
    left: "10%",
    alignItems: "center",
  },
  work_field: {
    position: "absolute",
    fontFamily: "BMJUA",
    top: "52%",
    left: "10%",
    alignItems: "center",
    color: "grey",
  },
  large: {
    top: "50%",
    left: "50%",
    justifyContent: "center",
    textAlign: "",
  },
}));

const style = {
  paper: {
    margin: "10% 0 5% 10%",
    width: "50%",
    // backgroundColor: "green",
  },
  bio: {
    width: "50%",
    marginLeft: "10%",
    // backgroundColor: "green",
  },
  backIcon: {
    position: "absolute",
  },
};

const ProfileDetail = (props) => {
  const history = useHistory();
  const classes = useStyles();
  console.log(props);
  const user = props.location.state;
  const nickname = props.match.params.nickname;
  if (user.work_company === " ") user.work_company = "회사 이름";
  if (user.work_field === " ") user.work_field = "분야";

  console.log(user);
  console.log(nickname);

  return (
    <>
      <div>
        <MypageNav text={"프로필"} />
      </div>

      <div className={classes.root}>
        <Typography className={classes.nickname}>{nickname}</Typography>
        <Typography className={classes.work_company}>
          {user.work_company}
        </Typography>
        <Typography className={classes.work_field}>
          {user.work_field}
        </Typography>

        <Avatar
          className={classes.avatar}
          aria-label="recipe"
          src="../static/live_IU2.png"
        ></Avatar>
      </div>

      <div className={classes.root2}>
        <div style={style.paper} className="BMDOHYEON">
          소개
        </div>
        <div style={style.bio} className="NotoSans2">
          {user.bio}
        </div>
        <div style={style.paper} className="BMDOHYEON">
          SNS
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
