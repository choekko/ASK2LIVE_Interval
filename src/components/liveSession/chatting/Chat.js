import React, { useRef, useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import { List, PageHeader, Spin } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Message from './Message';
import MessageInput from './MessageInput';
import EmptyScreen from './EmptyScreen';
import Spinner from './Spinner';
import { onRoomMessagesRead } from '../../../actions/MessagesActions';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import InsertField from "../InsertField"
import "../../../styles/style.css"
import { useCacheErrors } from 'antd/lib/form/util';
// import List from '@material-ui/core/List';

import { useSelector } from 'react-redux';

const windowPadding = 325;

const style = {
    Insertfield: {
        position: "fixed",
        bottom:"0%",
        width: "90%",
        marginLeft:"auto",
        marginRight:"auto",
        maxWidth: "44em",
    },
    top : {
        position : "absolute",
        top : "45%",
    }

}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));

const Chat = props => {

    const classes = useStyles();

    // 이 부분 정규식으로 바꾸기
    let currentUrl = window.location.href
    const params1 = currentUrl.split('?')
    const params2 = params1[1].split('&')
    const params3 = params2[0].split('=')
    const roomId = params3[1]

    const scrollToBottom = () => {
        let element = document.querySelector(".chatting");
        if (element) {

          element.scrollTop = element.scrollHeight ? element.scrollHeight : 0;
        }
        console.log("Here");
    }

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [message, setMessage] = useState('');
  const [roomSocket, setRoomSocket] = useState(null);

  // const roomId = "c9c9dd9bb";

  // const { room, messages: { messages, loading: loadingChat }, username, windowHeight, onBack, onRoomMessagesRead } = props;
  const { messages: { messages, loading: loadingChat }, username,  onRoomMessagesRead } = props;
  const { room, windowHeight, onBack} = props;
  

  const userid = useSelector(state => state.user.data.detail);

  useEffect(() => {
      roomSocket && roomSocket.close();
      setRoomSocket(onRoomMessagesRead(roomId)); //세션에 관한 정보 중에서 session.id를 여기 바로 넣으면 채팅방이 구분됨
    }, [room]);
    
    const onMessageSend = () => {
      if (roomSocket) {
        roomSocket.send(JSON.stringify({ command: 'new_message', data: { text: message, sender: userid.email } }));
        setMessage('');
        setTimeout(scrollToBottom,300);
      }
    }
    setTimeout(scrollToBottom,500);  // 채팅 올라오는 속도 조절은 타임아웃으로.. 

    const handleInfiniteOnLoad = () => {
        setLoading(true);
        messages.length > 14 && setLoading(false) && setHasMore(false);
    };
    
  const renderList = () => {
    if (loadingChat) return  (
        <>
    <Grid style={style.top} container justify="center">
        <div  className={classes.root}>
            <CircularProgress />
        </div>
    </Grid>
        </>
    )

    if (!messages.length) return <EmptyScreen description='' containerStyle={{ borderWidth: 0 }} />;

    return (
        <>
      <div className="chatting">
        <List
          className="comment-list NanumGothic3"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={message => <Message key={message.id.toString()} message={message} />}
        >
        {/* <List>
            {messages.map((message => <Message key={message.id.toString()} message={message} />))} */}
        </List>
          {loading && hasMore && <div className="loading-container"><Spin /></div>}
      </div>
      </>
    );
}

return (
    <React.Fragment>
      
      <div style={{ height: windowHeight - windowPadding }}>
        {renderList()}

      </div >
      <Grid container justify="center">
        
        <div style={style.Insertfield}>
                <InsertField message={message} goSetMessage={setMessage} goMessageSend={onMessageSend} goListUp = {props.goListUp} goDark={props.goDark} goQueUp={props.goQueUp}/>
        </div>
      </Grid>
      {/* <MessageInput message={message} onChange={e => setMessage(e.target.value)} onSendClick={onMessageSend} /> */}
    </React.Fragment>
  );
}

Chat.propTypes = {
  room: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  windowHeight: PropTypes.number,
  onBack: PropTypes.func,
  onRoomMessagesRead: PropTypes.func.isRequired
}

//상태를 연결시키는 함수는 mapStateToTrops로 만들어서 connect에 전달해준다.
//Store 안의 state 값을 props로 연결해준다.
const mapStateToProps = state => {
  const { messages } = state;
  const { username } = state.user;
  return { username, messages };
}

// chat 컴포넌트를 어플리케이션의 데이터 레이어와 묶는 역할을 한다.
// 함수가 여러개였다면 mapDispatchProps로 연결해줘야했을듯
export default connect(mapStateToProps, { onRoomMessagesRead })(Chat);