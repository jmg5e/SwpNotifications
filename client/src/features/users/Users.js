import React, { Component } from 'react';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, deleteUser, updateUser } from 'api/actions/users';
import UsersPage from './components';
import users from './selectors';

class Users extends Component {
  componentDidMount() {
    // if (this.props.users.length === 0) this.props.getUsers();
  }

  goToEditUser = (user) => {
    this.props.push(`/users/${user.id}`);
  };

  goToCreateUser = () => {
    this.props.push('/users/new');
  };

  render() {
    return (
      <UsersPage
        users={this.props.users}
        getUsers={this.props.getUsers}
        editUser={this.goToEditUser}
        newUser={this.goToCreateUser}
        deleteUser={this.props.deleteUser}
        updateUser={this.props.updateUser}
      />
    );
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  users: users.getAll(state),
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = {
  getUsers,
  deleteUser,
  updateUser,
  push,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
