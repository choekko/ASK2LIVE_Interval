import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, PageHeader, Spin } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Message from './Message';
import MessageInput from './MessageInput';
import EmptyScreen from './EmptyScreen';
import Spinner from './Spinner';
import { onRoomMessagesRead } from '../../../actions/MessagesActions';

const windowPadding = 325;

const Chat = props => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [message, setMessage] = useState('');
  const [roomSocket, setRoomSocket] = useState(null);

  const roomId = "c9c9dd9bb";

  // const { room, messages: { messages, loading: loadingChat }, username, windowHeight, onBack, onRoomMessagesRead } = props;
  const { messages: { messages, loading: loadingChat }, username,  onRoomMessagesRead } = props;
  const { room, windowHeight, onBack} = props.location.state;

  useEffect(() => {
    roomSocket && roomSocket.close();
    setRoomSocket(onRoomMessagesRead(roomId)); //세션에 관한 정보 중에서 session.id를 여기 바로 넣으면 채팅방이 구분됨
  }, [room]);

  const onMessageSend = () => {
    if (roomSocket) {
      roomSocket.send(JSON.stringify({ command: 'new_message', data: { text: message, sender: "70@70.com" } }));
      setMessage('');
    }
  }

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    messages.length > 14 && setLoading(false) && setHasMore(false);
  };

  const renderList = () => {
    if (loadingChat) return <Spinner />;

    if (!messages.length) return <EmptyScreen description='There are no messages' containerStyle={{ borderWidth: 0 }} />;

    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={message => <Message key={message.id.toString()} message={message} />}
        >
          {loading && hasMore && <div className="loading-container"><Spin /></div>}
        </List>
      </InfiniteScroll>
    );
  }

  return (
    <React.Fragment>
      
      <div className='infinite-container chat-infinite-container' style={{ height: windowHeight - windowPadding }}>
        {renderList()}
      </div >
      <MessageInput message={message} onChange={e => setMessage(e.target.value)} onSendClick={onMessageSend} />
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