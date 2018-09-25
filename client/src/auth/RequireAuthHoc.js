import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToHub } from 'signalR/actions';
import PropTypes from 'prop-types';

export default (WrappedComponent, requiredGroup = null, UnauthorizedComponent = null) => {
  class RequireAuth extends Component {
    hasPermision = () => {
      if (!this.props.authenticated || !this.props.user) {
        return false;
      }
      const { user: { hubGroups } } = this.props;

      if (requiredGroup) {
        if (!hubGroups && Array.isArray(hubGroups) && hubGroups.length <= 0) return false;
        return hubGroups.includes(requiredGroup);
      }

      return true;
    }

    render() {
      return this.hasPermision() ? <WrappedComponent /> : <UnauthorizedComponent />;
    }
  }

  const mapStateToProps = state => ({ ...state.auth });
  const mapDispatchToProps = { connectToHub };

  RequireAuth.defaultProps = {
    user: null,
  };

  RequireAuth.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      hubGroups: PropTypes.arrayOf(PropTypes.string),
      isAdmin: PropTypes.bool,
    }),
  };

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
};
