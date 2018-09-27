import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import LoginModal from 'auth/components/LoginModal';
import PropTypes from 'prop-types';
import ConnectForm from './ConnectForm';

const ConnectOrLogin = ({
  login,
  connectToHub,
  authenticating,
  clearError,
  errorMessage,
}) => (
  <Segment.Group raised>
    <ConnectForm
      onSubmit={({ name }) => connectToHub(name)
      }

    />
    <Segment attached="bottom">
      <LoginModal
        login={login}
        clearError={clearError}
        authenticating={authenticating}
        errorMessage={errorMessage}
        renderTrigger={modalProps => (
          <Button fluid size="large" content="Login" {...modalProps} />
        )}
      />
    </Segment>
  </Segment.Group>
);

ConnectOrLogin.propTypes = {
  connectToHub: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  authenticating: PropTypes.bool.isRequired,
};

export default ConnectOrLogin;
