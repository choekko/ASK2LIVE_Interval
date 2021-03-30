import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual1 } from 'react-redux'
import MypageNav from "./MypageNav";
import { getUserInfo } from "../../actions/UserActions";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from 'axios'

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
  },
  bio: {
    width: "50%",
    marginLeft: "10%",
  },
  backIcon: {
    position: "absolute",
  },
  edit : {
    top: 0,
    right: "7%",
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
  const dispatch = useDispatch();

  // const config = {
  //   headers: { Authorization: 'Token ' + localStorage.token }
  // }

  // let res;
  // axios.get('https://143.248.226.51:8000/api/user/read', config).then((res) => 
  //   console.log(res)
  //   );
  //   const user = res.data.detail;
  // getUserInfo(localStorage.token);
  // console.log(res);
  // useEffect(() => {
    //   console.log("RENDERING!!")
    // },[dispatch, user])
    
    
  const user = useSelector((state) => state.user.data.detail);
  
  
  const nickname = user.nickname;
  if (!user.work_company.length) user.work_company = "회사 이름";
  if (!user.work_field.length) user.work_field = "분야";
  // const user = props.location.state;
  // const nickname = props.match.params.nickname;

  const goToEdit = () => {
    console.log("click");
    history.push({
      pathname: `${nickname}/edit`,
      state: user});
  }
  if (!user) return<p> 로딩중 </p>
  return (
    <>
      <div>
        <MypageNav text={"프로필"} />
        <div
        className="BMJUA"
        style={style.edit}
        onClick={goToEdit}
        > 편집 </div>
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
