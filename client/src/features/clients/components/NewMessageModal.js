import React, { Component } from 'react';
import {
  Header, Modal, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import MessageForm from './MessageForm';

class NewMessageModal extends Component {
  state = {
    open: false,
  };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  handleSubmit = ({ text }) => {
    this.props.send(text);
    this.close();
  }

  render() {
    const Trigger = this.props.renderTrigger;
    return (
      <Modal open={this.state.open} trigger={<Trigger onClick={this.open} />}>
        <Header as="h2" textAlign="center">
          <Icon name="comment" />
          {this.props.title}
        </Header>
        <MessageForm
          onSubmit={this.handleSubmit}
          handleCancel={this.close}
        />
      </Modal>
    );
  }
}

NewMessageModal.defaultProps = {
  title: 'New Message',
  // eslint-disable-next-line
  renderTrigger: ({ onClick }) => <Button onClick={onClick}> message </Button>,
};


NewMessageModal.propTypes = {
  title: PropTypes.string,
  renderTrigger: PropTypes.func,
  // errorMessage: PropTypes.string,
  send: PropTypes.func.isRequired,
};

export default NewMessageModal;
