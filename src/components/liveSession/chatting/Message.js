import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';

const Message = memo(props => {
  const { message: { sender, sent_timestamp, text } } = props;


  return (
    <Comment
      style={{ paddingBottom: 0 }}
      author={`${sender} : `}
      content={<p style={{wordBreak: "break-all" , textAlign: 'left' }}>{text}</p>}
    />
  );
})

Message.propTypes = {
  message: PropTypes.object.isRequired
}

export default Message;