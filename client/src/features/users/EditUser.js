import React, { Component } from 'react';
import { goBack } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from 'api/actions/users';
import auth from 'auth/selectors';
import EditUserPage from './components/EditUserPage';
import users from './selectors';

// eslint-disable-next-line
class EditUser extends Component {
  render() {
    return (
      <EditUserPage
        user={this.props.user}
        updateUser={this.props.updateUser}
        goBack={this.props.goBack}
        currentUser={this.props.currentUser}
      />
    );
  }
}

EditUser.propTypes = {
  updateUser: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    userName: PropTypes.string,
    isAdmin: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  user: users.getById(state, ownProps),
  currentUser: auth.getCurrentUserName(state),
});

const mapDispatchToProps = {
  updateUser,
  goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUser);
