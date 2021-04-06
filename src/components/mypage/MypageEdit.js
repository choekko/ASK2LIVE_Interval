import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { SettingsInputAntenna } from "@material-ui/icons";

import axios from "axios";
import MypageNav from "./MypageNav";
import { getUserInfo, updateUserInfo } from "../../actions/UserActions";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  },
}));

const style = {
  field: {
    // position: "relative",
    display: "flex",
    maxWidth: "50em",
    margin: "auto",
  },
  text: {
    fontWeight: "bold",
    position: "relative",
    maxWidth: "50em",
    margin: "2% auto",
    marginBottom: "4%",
  },
  forForm: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    // padding: '10%',
    width: "100%",
    maxWidth: "80em",
    // padding: "3px",
    // backgroundColor: 'blue',
  },
  button: {
    position: "relative",
    width: "40%",
    maxWidth: "25em",
    margin: "auto 2%",
  },
};

const MypageEdit = (props) => {
  console.log("MypageEdit");

  const classes = useStyles();
  const history = useHistory();
  const user = props.routerInfo.location.state;

  console.log(user);

  const [image, setImage] = useState({ profile_image: { 0 :"https://www.ask2live.me"+user.profile_image }});
  const [inputs, setInputs] = useState({
    work_field: user.work_field,
    username: user.username,
    work_company: user.work_company,
    bio: user.bio,
  });

  const {
    work_field,
    username,
    work_company,
    bio,
  } = inputs;

  const dispatch = useDispatch();
  const onChange = useCallback((e) => {
    console.log("e.target.name",e.target.name)
    if(e.target.name === "image"){
      setImage({
        profile_image: e.target.files,
      });
      console.log("e.target.files",e.target.files);
    }else{
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
    
  });

  const onClick = async (e) => {
    e.preventDefault();

    const config = {
      headers: { "Content-Type": "multipart/form-data", Authorization: "Token " + localStorage.token },
    };
    const data = {
        work_field: work_field,
        username: username,
        work_company: work_company,
        bio: bio,
    };
    const formData = new FormData();
    formData.append('work_field', data.work_field);
    formData.append('username', data.username);
    formData.append('work_company', work_company);
    formData.append('bio', bio);
    console.log("default image", image.profile_image[0]);
    formData.append('profile_image', image.profile_image[0]);

    console.log("====DATA====", formData);
    const res = await axios.patch(
      "https://www.ask2live.me/api/user/update",
      formData,
      config,
    )
    console.log("업데이트 성공~", res.data);
    dispatch(getUserInfo(localStorage.token));
    console.log("====DATA====", formData);

    history.push({
      pathname: '/mypage/' + username,
      state: user
    })
  };

  return (
    <>
      <MypageNav text={"프로필 편집"} />
      <Grid container direction="row" justify="center">
        <div style={style.forForm} noValidate autoComplete="off">
          <div style={style.text}>이름</div>
          <TextField
            style={style.field}
            required
            id="outlined-required"
            label="username"
            defaultValue={user.username}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
            name="username"
          />

          <br/>
          <br/>
          <div style={style.text}>
          기존 프로필 : <a href={`https://www.ask2live.me${user.profile_image}`}>{user.profile_image}</a><br/>
          <input 
            className="fileInput" 
            type="file" 
            name="image"
            // accept="image/*"
            onChange={onChange} />
          </div>

          <div style={style.text}>이력</div>
          <TextField
            style={style.field}
            id="outlined-required"
            label="회사 이름"
            defaultValue={user.work_company}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
            name="work_company"
          />
          <TextField
            style={style.field}
            id="outlined-required"
            label="직무"
            defaultValue={user.work_field}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
            name="work_field"
          />
          <br></br>
          <div style={style.text}>이력</div>
          <TextField
            style={style.field}
            id="outlined-multiline-static"
            label="짧은 자기소개"
            multiline
            rows={4}
            defaultValue={user.bio}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
            name="bio"
          />
          <br></br>

          {/* SNS 필드 삭제 */}
          {/* <div style={style.text}>SNS</div>
          <TextField
            style={style.field}
            id="outlined-multiline-static"
            label="주소"
            multiline
            defaultValue={user.bio}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          /> */}

          <Grid container justify="center">
            <Button
              style={style.button}
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => {
                history.goBack();
              }}
            >
              <div style={style.font3} color="030916">
                취소하기
              </div>
            </Button>

            <Button
              style={style.button}
              variant="contained"
              color="primary"
              size="large"
              onClick={onClick}
            >
              <div style={style.font3} color="030916">
                확정하기
              </div>
            </Button>
          </Grid>
        </div>
            <div
              style={{
                backgroundColor: "yellow",
                height: "10em",
                width: "100%",
                marginBottom: "5%",
              }}
            />
      </Grid>
    </>
  );
};

export default MypageEdit;
