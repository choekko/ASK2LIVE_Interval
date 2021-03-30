import React, { useState } from "react"
import axios from "axios"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseQuestioning from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import useSelection from "antd/lib/table/hooks/useSelection";



const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        maxWidth: "42em",
      display: 'flex',
      flexWrap: 'wrap',
    //   width: "95%",
      width: "95%",
      bottom: "0%",
      marginBottom: "1em",
    //   marginBottom: "3px",
      
      '& > *': {
          
        // margin: theme.spacing(2),
        width : "100%",
        height: theme.spacing(10),
        // height: "70px",
        borderRadius : "15px",
      },
    },
  }));

const style = {
    paper : {
        position: "absolute",
        bottom:"0%",
        width: "100%",
        height : "100%",
        backgroundColor: "white",
        borderRadius: "20px 20px 0 0 "
    },
    questionbutton : {
        position: "absolute",
        top: "0%",
        right: "2.5%",
    },
    card : {
        borderRadius : "15px 15px 0 0",
        backgroundColor: "#7A6890",
        height: "1.5rem",
        // height: "20px",
        padding: "0.3rem",
        // padding: "3px",
    },
    submitbtn : {
        position: "relative",
        display: "block",
        float: "right",
        backgroundColor: "wheat",
        width: "15%",
        height: "2.4em",
    }
}

const Questioning = (props) => {

    const classes = useStyles();
    const [ask, setAsk] = useState("")

    const postApi = async(isVoice, askValue) =>  {
        const headers = {
            'Authorization': 'Token ' + localStorage.token
          }
          const data = {
              is_answered: false,
              is_voice: isVoice,
              question: askValue,
          };
          console.log(data);
          const res = await axios.post(
            "https://143.248.226.51:8000/api/hole/"+props.holeId + "/question/create",
            data,
            {headers:headers}
          );
    }

    return (
        <>
        <Paper style={style.paper} elevation={1}>
            <Grid container justify="center">
                <div className={classes.root}>
                    <Paper elevation={2} >
                        <div style={style.card}>
                            사람이름
                            <div style={{float:"right"}}>
                                <span className="BMJUA" style={{fontSize: "0.8em"}}> 음성 질문 </span>
                                <Checkbox
                                    style={{right : "3px", padding: "0"}}
                                    defaultChecked
                                    size="small"
                                    inputProps={{ 'aria-label': 'checkbox with small size' }}
                                />
                            </div>
                        </div>
                        <input
                        style={{position:"relative", width:"80%"}}
                        onChange={(e) => setAsk(e.target.value)}
                        />
                        <div style={style.submitbtn}>
                            <button
                            onClick={()=>{postApi(false, ask)}}
                            > 
                            게시버튼</button>
                        </div>
                    </Paper>
                </div>
            </Grid>
        <IconButton style={style.questionbutton} onClick={()=>{props.goQueUp({transform : "translate(0, 100%)"}); props.goDark({opacity: "0", animation: "golight 0.7s"}); setTimeout(()=>{props.goDark({display: "none"})}, 700)}} aria-label="question_list">
            <CloseQuestioning fontSize="large" />
        </IconButton>
        </Paper>
        </>
    )
}

export default Questioning