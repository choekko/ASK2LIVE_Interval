import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import getQuestionlist from '../../actions/QuestionListActions';

const MyQuestionCards = () => {
  let [myQuestions, setMyQuestions] = useState([])

  const user = useSelector(state => state.user)
  const questions = useSelector(state => state.questionlist)
  
  const userId = user.data.detail.id
  const questionsList = questions.data.detail
  console.log('user', user.data.detail)
  console.log('questionsList', questionsList)

  if(Object.keys(questionsList).length != 0){
    questionsList.map((question) => {
      const questionAuthor = parseInt(question.user)
      console.log(questionAuthor)
        if(userId === questionAuthor){
          myQuestions = [...myQuestions, question]
        }
    })
  }
  console.log(myQuestions)

  return (
    <>
      {myQuestions.length === 0 ? 
        <div>질문을 등록해주세요</div> :
        
        myQuestions.map((question) => 
        <>
            <QuestionCard question={question}/>
            <Divider light />
            </>
        )}
    </>
  )
}

const MyQuestionSend = ({session}) => {
  const [ask, setAsk] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
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
        "https://143.248.226.51:8000/api/hole/"+session.id + "/question/create",
        data,
        {headers:headers}
      );
      dispatch(getQuestionlist(session.id))
}
  return (
    <>
    
    <div style={{paddingBottom:"1em"}}>
    <input
    type="text"
    maxLength="60"
    value={ask}
    style={style.insert}
    placeholder="최대 글자수는 60자입니다."
    onChange={(e) => setAsk(e.target.value)}
    />
    <div style={style.submitbtn}>
    <IconButton 
        onClick={()=>{
          postApi(false, ask); setAsk("")
          
          }} 
        className={classes.iconButton} 
        aria-label="send">
        <SendIcon/>
    </IconButton>
    </div>
    </div>
    </>
  )
}

const QuestionCard = ({question}) => {
    const classes = useStyles();
    return(
        <>
        <Card key={question.id} className={classes.card}>
        <CardHeader
            subheader={question.user_nickname}/>
        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {question.question}
        </Typography>
        </CardContent>
        </Card>
        </>
    )
}


//Tab 관련 로직
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "1000",
    backgroundColor: "#E2D8CF",
    paddingBottom: "3em",
  },
}));

const style = {

  submitbtn : {
      display: "flex",
      justifyContent: "center",
      float: "right",
      right: "3px",
      width: "10%",
      top: "2.4em",
      height: "2.4em",
      zIndex: "2",
  },
  insert : {
      top: "3.2em",
      left : "9px",
      height: "2em",
      width:"86%",
      borderBottom : "1px solid",
      borderTop: "0px",
      borderLeft : "0",
      borderRight: "0",
  }

}

const PreQuestionNav = ({session}) => {
  const classes = useStyles();
  const questions = useSelector(state => state.questionlist)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:"gray"}}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="등록된 질문" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="질문하기" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      {questions.data.detail.length === 0 ? 
        <div>질문을 등록해주세요</div> :
        
        questions.data.detail.map((question) => 
        <>
            <QuestionCard question={question}/>
            <Divider light />
            </>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyQuestionSend session={session} />
        <MyQuestionCards questions={questions} />
      </TabPanel>
    </div>
  );
}

export default PreQuestionNav