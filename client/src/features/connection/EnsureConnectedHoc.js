import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { connectToHub } from 'signalR/actions';
import PropTypes from 'prop-types';

export default (WrappedComponent) => {
  class EnsureConnected extends Component {
    componentWillMount() {
      if (!this.props.connected && !this.props.connecting) {
        this.props.connectToHub();
      }
    }

    render() {
      if (this.props.connected || this.props.connecting) return <WrappedComponent />;
      return <Redirect from="/" to="disconnected" />;
    }
  }

  const mapStateToProps = state => ({ ...state.connection });
  const mapDispatchToProps = { connectToHub };
  EnsureConnected.propTypes = {
    connected: PropTypes.bool.isRequired,
    connecting: PropTypes.bool.isRequired,
    connectToHub: PropTypes.func.isRequired,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EnsureConnected);
};
