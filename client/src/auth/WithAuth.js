import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from 'api/actions/auth';
import { logout } from './actions';

const WithAuth = (props) => {
  const Component = props.render;
  return <Component login={props.login} logout={props.logout} {...props.auth} />;
};

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch),
  logout: bindActionCreators(logout, dispatch),
});

WithAuth.propTypes = {
  render: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
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
