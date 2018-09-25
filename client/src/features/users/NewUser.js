import React from 'react';
import { goBack } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser } from 'api/actions/users';
import NewUserPage from './components/NewUserPage';


const NewUser = props => (
  <NewUserPage
    goBack={props.goBack}
    createUser={props.createUser}
  />
);

NewUser.propTypes = {
  createUser: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading,
});

const mapDispatchToProps = {
  createUser,
  goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewUser);
