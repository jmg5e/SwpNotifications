import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Message from './Message';

const MessageList = ({ messages, deleteAll, deleteMessage }) => (
  <Segment.Group>
    <Segment>
      <Button compact size="mini" floated="right" onClick={deleteAll}>
        Delete All
      </Button>
      Messages
    </Segment>
    <Segment secondary style={{ overflow: 'auto' }}>
      {messages.map(message => (
        <Message
          key={message.id}
          message={message}
          deleteMessage={() => deleteMessage(message.id)}
        />
      ))}
    </Segment>
  </Segment.Group>
);

MessageList.propTypes = {
  deleteAll: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MessageList;
