import React, { Component } from 'react';
import {
  Header, Icon, Modal, Message, Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

class LoginModal extends Component {
  state = {
    open: false,
  };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const Trigger = this.props.renderTrigger;
    return (
      <Modal open={this.state.open} trigger={<Trigger onClick={this.open} />}>
        <Header as="h2" textAlign="center">
          <Icon name="user" />
          Log-in
        </Header>
        <LoginForm
          onSubmit={this.props.login}
          handleCancel={this.close}
          authenticating={this.props.authenticating}
        />
        {this.props.errorMessage && <Message negative>{this.props.errorMessage}</Message>}
      </Modal>
    );
  }
}

LoginModal.defaultProps = {
  errorMessage: '',
  // eslint-disable-next-line
  renderTrigger: ({ onClick }) => <Button onClick={onClick}> Login </Button>,
};


LoginModal.propTypes = {
  // trigger: PropTypes.node.isRequired,
  renderTrigger: PropTypes.func,
  errorMessage: PropTypes.string,
  login: PropTypes.func.isRequired,
  authenticating: PropTypes.bool.isRequired,
};

export default LoginModal;
