import React, { Component } from 'react';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, deleteUser, updateUser } from 'api/actions/users';
import { confirm } from 'features/confirm/actions';
import UsersPage from './components';
import users from './selectors';

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  goToEditUser = (userId) => {
    this.props.push(`/users/${userId}`);
  };

  goToCreateUser = () => {
    this.props.push('/users/new');
  };

  confirmUserDelete = (user) => {
    this.props.confirm(() => this.props.deleteUser(user), `Are You Sure you want to delete User ${user.userName}?`);
  }

  render() {
    return (
      <UsersPage
        users={this.props.users}
        getUsers={this.props.getUsers}
        editUser={this.goToEditUser}
        newUser={this.goToCreateUser}
        deleteUser={this.confirmUserDelete}
        updateUser={this.props.updateUser}
      />
    );
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string,
      id: PropTypes.string,
      hubGroups: PropTypes.arrayOf(PropTypes.string),
      isAdmin: PropTypes.bool,
      isLocked: PropTypes.bool,
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
  confirm,
  push,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
