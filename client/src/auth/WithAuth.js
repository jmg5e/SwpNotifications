import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from 'api/actions/auth';
import { logout, clearError } from './actions';

const WithAuth = (props) => {
  const Component = props.render;
  return (
    <Component
      login={props.login}
      logout={props.logout}
      clearError={props.clearError}
      {...props.auth}
    />
  );
};

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
  login,
  logout,
  clearError,
};

WithAuth.propTypes = {
  render: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    authenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
    authenticating: PropTypes.bool,
    user: PropTypes.shape({
      userName: PropTypes.string,
      isAdmin: PropTypes.bool,
    }),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithAuth);
