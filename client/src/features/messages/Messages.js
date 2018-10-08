import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageList from './components/MessageList';
import { deleteMessages, deleteMessage } from './actions';

const Messages = props => (
  <MessageList
    messages={props.messages}
    deleteAll={props.deleteMessages}
    deleteMessage={props.deleteMessage}
  />
);

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteMessages: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  messages: state.messages,
});

const mapDispatchToProps = {
  deleteMessages,
  deleteMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);
