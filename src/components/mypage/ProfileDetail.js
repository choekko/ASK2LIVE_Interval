import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MypageNav from "./MypageNav";
import "../../styles/style.css";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';

import { getUserInfo } from "../../actions/UserActions";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "95%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF5941",
    maxWidth: "50em",
    margin: "auto",
  },
  root2: {
    position: "absolute",
    top: "10%",
    left: 0,
    right: 0,
    margin: "auto",
    height: "95.3%",
    width: "88%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "15px 15px 0 0",
    boxShadow: "2px 1px 5px 3px rgba(0,0,0, 0.7)",
    maxWidth: "70em",
  },
  avatar: {
    position: "absolute",
    top: "8%",
    right: "8%",
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  username: {
    position: "absolute",
    fontFamily: "BMDOHYEON",
    fontSize: "1.5em",
    top: "8%",
    left: "8%",
  },
  work_company: {
    position: "absolute",
    fontFamily: "BMJUA",
    top: "28%",
    left: "5%",
  },
  work_field: {
    position: "absolute",
    fontFamily: "BMJUA",
    top: "34%",
    left: "5%",
    color: "grey",
  },
  bio: {
    position: "absolute",
    transform:"translate(0, -3em)",
    fontFamily: "BMJUA",
    // top: "50%",
    left: "5%",
  },
}));

const style = {
  edit: {
    fontFamily: "BMJUA",
    fontSize: "1em",
    top: 0,
    right: 0,
    position: "fixed",
    zIndex: 2,
  },

};

const ProfileDetail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  console.log("PROPS", props);
  const user = props.routerInfo.location.state;

  let profile = {};
  useEffect(() => {
    dispatch(getUserInfo(localStorage.token));
  });

  if (props.routerInfo.location.state.host) {
    const host = props.routerInfo.location.state.host;
    console.log("host : ", host);
    if (!host.work_company.length)
      host.work_company = "ASK2LIVE";
    if (!host.work_field.length) host.work_field = "Live Q&A";

    profile = {
      username: host.username,
      profile_image: host.profile_image,
      work_company: host.work_company,
      work_field: host.work_field,
      bio: host.bio,
    };
  } else {
    if (!user.work_company.length)
      user.work_company = "ASK2LIVE";
    if (!user.work_field.length) user.work_field = "Live Q&A";
    profile = {
      username: user.username,
      profile_image: user.profile_image,
      work_company: user.work_company,
      work_field: user.work_field,
      bio: user.bio,
    };
  }

  const goToEdit = () => {
    console.log("click");
    history.replace({
      pathname: `${profile.username}/edit`,
      state: user});
  }
  if (!user || !profile) return<p> 로딩중 </p>

  return (
    <>
      <div>
        <MypageNav text={"프로필"} />
        {user.username === profile.username && (
          <Button
            // className="BMJUA"
            style={style.edit}
            onClick={goToEdit}
          >
            <span>편집</span>
          </Button>
        )}
      </div>

      <div className={classes.root}>
        <div className={classes.root2}>
          <div>
            <p className={classes.username}>{profile.username}</p>
            <Avatar
              className={classes.avatar}
              aria-label="recipe"
              src={`https://www.ask2live.me${profile.profile_image}`}
            ></Avatar>
          </div>

          <p className={classes.work_company}>
            [근무 회사] {profile.work_company}
          </p>
          <p className={classes.work_field}>
            [일하는 분야] {profile.work_field}
          </p>

          <div
            style={{
              position: "absolute",
              top: "54%",
              width: "100%",
              height: "40.5%",
            }}
          >
            <p className={classes.bio}>
              [소개]
              <br />
            </p>
            <div className="bioWrapper">
                
              <p style={{marginTop: 0}}>
                {profile.bio}
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
