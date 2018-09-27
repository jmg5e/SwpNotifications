import React, { Component } from 'react';
import { connect } from 'react-redux';
import Connect from 'connection/Connect';
import { connectToHub } from 'signalR/actions';
import PropTypes from 'prop-types';

export default (WrappedComponent) => {
  class EnsureConnected extends Component {
    componentWillMount() {
      /* reconnect if logged in */
      if (this.loggedInAndNotConnected()) {
        this.props.connectToHub();
      }
    }

    loggedInAndNotConnected = () => {
      const notConnected = !this.props.connected && !this.props.connecting;
      const loggedIn = this.props.authenticated;
      return loggedIn && notConnected;
    };

    render() {
      if (this.props.connected) return <WrappedComponent />;
      return <Connect />;
    }
  }

  const mapStateToProps = state => ({
    ...state.connection,
    ...state.auth,
  });

  const mapDispatchToProps = { connectToHub };

  EnsureConnected.propTypes = {
    connected: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    connecting: PropTypes.bool.isRequired,
    connectToHub: PropTypes.func.isRequired,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EnsureConnected);
};
