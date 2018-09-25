import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Message from './Message';

const Layout = styled.div`
  padding: 20px;
  /* display: flex; */
  /* flex-direction: column; */
  /* flex: 1 1 auto; */
  display: grid;
  grid-template-rows: 1fr;
  row-gap: 10px;
  width: 100%;
  height: 100%;
`;

const MessageList = ({ messages, deleteAll, deleteMessage }) => (
  <Layout>
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
  </Layout>
);

MessageList.propTypes = {
  deleteAll: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MessageList;
