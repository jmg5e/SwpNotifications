import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectToHub } from 'signalR/actions';
import ConnectPage from './components/ConnectPage';

const Connect = props => (
  <ConnectPage
    connectToHub={props.connectToHub}
    {...props.connection}
  />
);

Connect.propTypes = {
  connectToHub: PropTypes.func.isRequired,
  connection: PropTypes.shape({
    connected: PropTypes.bool,
    errorMessage: PropTypes.string,
    connecting: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  connection: state.connection,
});

const mapDispatchToProps = {
  connectToHub,
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
