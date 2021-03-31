import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import MypageNav from "./MypageNav";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
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
  },
  nickname: {
    position: "absolute",
    fontFamily: "BMDOHYEON",
    fontSize: "1.2em",
    top: "30%",
    left: "10%",
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
  },
  bio: {
    width: "50%",
    marginLeft: "10%",
  },
  edit : {
    fontFamily: "BMJUA",
    top: 0,
    right: 0,
    height: "5%",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    zIndex: 2,
  }
};



const ProfileDetail = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const user = useSelector((state) => state.user.data.detail);
  console.log(props)

  let profile = {}
  if (props.location.state.host){
    const host = props.location.state.host;
    console.log("host : ", host)
    if (!host.work_company.length) host.work_company = "회사 이름";
    if (!host.work_field.length) host.work_field = "분야";

    profile = {
      nickname: host.nickname,
      work_company: host.work_company,
      work_field: host.work_field,
      bio: host.bio,
    }
  } else {
    profile = {
      nickname: user.nickname,
      work_company: user.work_company,
      work_field: user.work_field,
      bio: user.bio,
    }
  }


  const goToEdit = () => {
    console.log("click");
    history.push({
      pathname: `${profile.nickname}/edit`,
      state: user});
  }
  if (!user || !profile) return<p> 로딩중 </p>
  return (
    <>
    <div >
        <MypageNav text={"프로필"} />
        {user.nickname === profile.nickname && 
        <Button
        // className="BMJUA"
        style={style.edit}
        onClick={goToEdit}
        > 편집 </Button>
        }
    
    </div>


      <div className={classes.root}>
        <Typography className={classes.nickname}>{profile.nickname}</Typography>
        <Typography className={classes.work_company}>
          {profile.work_company}
        </Typography>
        <Typography className={classes.work_field}>
          {profile.work_field}
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
          {profile.bio}
        </div>
        <div style={style.paper} className="BMDOHYEON">
          SNS
        </div>
      </div>
    </>
  );
};

export default ProfileDetail
