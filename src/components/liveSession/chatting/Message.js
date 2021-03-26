import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';

const Message = memo(props => {
  const { message: { author, sent, text } } = props;

  return (
    <Comment
      style={{ paddingBottom: 0 }}
      author={`@${author}`}
      content={<p style={{ textAlign: 'left' }}>{text}</p>}
    />
  );
})

Message.propTypes = {
  message: PropTypes.object.isRequired
}

export default Message;