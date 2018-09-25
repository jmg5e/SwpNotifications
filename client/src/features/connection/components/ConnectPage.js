import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';
import WithAuth from 'auth/WithAuth';
import { Link } from 'react-router-dom';
import LoginModal from 'auth/components/LoginModal';
import PropTypes from 'prop-types';

const ConnectPage = ({
  name, handleNameChange, connectToHub, errorMessage, connecting,
}) => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" textAlign="center">
        <Icon name="plug" /> Connect
      </Header>
      <Segment loading={connecting}>
        <Segment.Group raised>
          <Form>
            <Segment basic>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                defaultValue={name}
                onChange={handleNameChange}
                placeholder="Name"
              />
            </Segment>
            <Segment basic>
              <Button fluid size="large" onClick={connectToHub}>
                Connect
              </Button>
            </Segment>
          </Form>
        </Segment.Group>
        <Segment attached="bottom">
          <WithAuth
            render={authProps => (
              <LoginModal
                {...authProps}
                renderTrigger={modalProps => (
                  <Button fluid size="large" content="Login" {...modalProps} />
                )}
              />
            )}
          />
        </Segment>
        <Link to="settings"> Go To Settings</Link>
      </Segment>
      {errorMessage && <Message negative>{errorMessage}</Message>}
    </Grid.Column>
  </Grid>
);

ConnectPage.propTypes = {
  name: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  connecting: PropTypes.bool.isRequired,
  connectToHub: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default ConnectPage;
