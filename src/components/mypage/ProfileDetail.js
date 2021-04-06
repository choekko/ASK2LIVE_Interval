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

  const user = props.routerInfo.location.state;

  useEffect(() => {
    dispatch(getUserInfo(localStorage.token));
  });

  let profile = {};
  if (props.routerInfo.location.state.host) {
    const host = props.routerInfo.location.state.host;
    console.log("host : ", host);
    if (!host.work_company.length)
      host.work_company = "회사 이름을 입력해주세요";
    if (!host.work_field.length) host.work_field = "분야를 입력해주세요";

    profile = {
      username: host.username,
      profile_image: host.profile_image,
      work_company: host.work_company,
      work_field: host.work_field,
      bio: host.bio,
    };
  } else {
    if (!user.work_company.length)
      user.work_company = "회사 이름을 입력해주세요";
    if (!user.work_field.length) user.work_field = "분야를 입력해주세요";
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
    history.push({
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
                첫 번째 줄: useState Hook을 React에서 가져옵니다. 네 번째 줄:
                useState Hook을 이용하면 state 변수와 해당 state를 갱신할 수
                있는 함수가 만들어집니다. 또한, useState의 인자의 값으로 0을
                넘겨주면 count 값을 0으로 초기화할 수 있습니다. 아홉 번째 줄:
                사용자가 버튼 클릭을 하면 setConut 함수를 호출하여 state 변수를
                갱신합니다. React는 새로운 count 변수를 Example 컴포넌트에
                넘기며 해당 컴포넌트를 리렌더링합니다. 많은 것들이 있기 때문에
                처음에는 다소 어려울 수 있습니다. 설명이 이해가 잘 안 된다면,
                위의 코드를 천천히 다시 읽어보세요. 클래스 컴포넌트에서 사용하던
                state 동작 방식을 잊고, 새로운 눈으로 위의 코드를 보면 분명히
                이해가 갈 것입니다.
                첫 번째 줄: useState Hook을 React에서 가져옵니다. 네 번째 줄:
                useState Hook을 이용하면 state 변수와 해당 state를 갱신할 수
                있는 함수가 만들어집니다. 또한, useState의 인자의 값으로 0을
                넘겨주면 count 값을 0으로 초기화할 수 있습니다. 아홉 번째 줄:
                사용자가 버튼 클릭을 하면 setConut 함수를 호출하여 state 변수를
                갱신합니다. React는 새로운 count 변수를 Example 컴포넌트에
                넘기며 해당 컴포넌트를 리렌더링합니다. 많은 것들이 있기 때문에
                처음에는 다소 어려울 수 있습니다. 설명이 이해가 잘 안 된다면,
                위의 코드를 천천히 다시 읽어보세요. 클래스 컴포넌트에서 사용하던
                state 동작 방식을 잊고, 새로운 눈으로 위의 코드를 보면 분명히
                이해가 갈 것입니다.
                첫 번째 줄: useState Hook을 React에서 가져옵니다. 네 번째 줄:
                useState Hook을 이용하면 state 변수와 해당 state를 갱신할 수
                있는 함수가 만들어집니다. 또한, useState의 인자의 값으로 0을
                넘겨주면 count 값을 0으로 초기화할 수 있습니다. 아홉 번째 줄:
                사용자가 버튼 클릭을 하면 setConut 함수를 호출하여 state 변수를
                갱신합니다. React는 새로운 count 변수를 Example 컴포넌트에
                넘기며 해당 컴포넌트를 리렌더링합니다. 많은 것들이 있기 때문에
                처음에는 다소 어려울 수 있습니다. 설명이 이해가 잘 안 된다면,
                위의 코드를 천천히 다시 읽어보세요. 클래스 컴포넌트에서 사용하던
                state 동작 방식을 잊고, 새로운 눈으로 위의 코드를 보면 분명히
                이해가 갈 것입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
