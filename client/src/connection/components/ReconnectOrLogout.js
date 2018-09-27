import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ReconnectOrLogout = ({ userName, logout, connectToHub }) => (
  <Segment.Group raised>
    <Segment basic>
      <Button fluid size="large" content={`Recconnect as ${userName}`} onClick={connectToHub} style={{ marginBottom: '10px' }} />
      <Button fluid size="large" content="Logout" onClick={logout} style={{ marginBottom: '10px' }} />
    </Segment>
  </Segment.Group>
);

ReconnectOrLogout.propTypes = {
  userName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  connectToHub: PropTypes.func.isRequired,
};

export default ReconnectOrLogout;
