import React from 'react';
import {
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';
import WithAuth from 'auth/WithAuth';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReconnectOrLogout from './ReconnectOrLogout';
import ConnectOrLogin from './ConnectOrLogin';

const ConnectPage = ({
  connectToHub,
  errorMessage,
  connecting,
}) => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" textAlign="center">
        <Icon name="plug" /> Connect
      </Header>
      <Segment loading={connecting}>
        <WithAuth
          render={authProps => (authProps.authenticated ? (
            <ReconnectOrLogout
              userName={authProps.user.userName}
              logout={authProps.logout}
              connectToHub={connectToHub}
            />
          ) : (
            <ConnectOrLogin connectToHub={connectToHub} {...authProps} />
          ))
          }
        />
        <Link to="settings"> Go To Settings</Link>
      </Segment>
      {errorMessage && <Message negative>{errorMessage}</Message>}
    </Grid.Column>
  </Grid>
);

ConnectPage.propTypes = {
  connecting: PropTypes.bool.isRequired,
  connectToHub: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default ConnectPage;
