import React from 'react';
import PropTypes from 'prop-types';
import { Button, Message, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const DisconnectedModal = ({
  connected,
  errorMessage,
  connectToHub,
  connecting,
}) => (
  <Modal size="fullscreen" open={!connected} closeOnDimmerClick={false}>
    <Modal.Header>Not Connected</Modal.Header>
    <Modal.Content>
      {errorMessage && <Message negative>{errorMessage}</Message>}
    </Modal.Content>
    <Modal.Actions>
      <Button as={Link} to="settings" content="Settings" icon="settings" />
      <Button
        primary
        loading={connecting}
        disabled={connecting}
        onClick={connectToHub}
      >
        Connect
      </Button>
    </Modal.Actions>
  </Modal>
);

DisconnectedModal.defaultProps = { errorMessage: '' };

DisconnectedModal.propTypes = {
  connected: PropTypes.bool.isRequired,
  connecting: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  connectToHub: PropTypes.func.isRequired,
};

export default DisconnectedModal;
