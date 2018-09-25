import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  padding: 30px;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto auto 1fr auto;
  grid-template-areas:
    "info from timestamp actions"
    "info messageText messageText actions";
  background-color: white;
  border-bottom: 1px solid black;
`;

const Info = styled.div`
  grid-area: info;
  align-self: center;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
`;

const DeleteButton = styled(Button)`
  grid-area: actions;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const Timestamp = styled.div`
  grid-area: timestamp;
`;

const From = styled.div`
  grid-area: from;
  padding-right: 50px;
`;

const MessageText = styled.div`
  grid-area: messageText;
  padding-left: 20px;
`;

const Message = ({ message, deleteMessage }) => (
  <MessageContainer>
    <Info>
      <Popup
        trigger={<Icon name="mail" />}
        content={JSON.stringify(message, null, 2)}
      />
    </Info>
    <Timestamp>
      {new Date(message.timeStamp).toLocaleTimeString()}
    </Timestamp>
    <From>From: {message.from}</From>
    <MessageText>{message.text}</MessageText>
    <DeleteButton icon="delete" content="delete" compact size="mini" onClick={deleteMessage} />
  </MessageContainer>
);

Message.propTypes = {
  deleteMessage: PropTypes.func.isRequired,
  message: PropTypes.shape({
    id: PropTypes.string,
    timeStamp: PropTypes.string,
    from: PropTypes.string,
    text: PropTypes.string,

  }).isRequired,
};

export default Message;
