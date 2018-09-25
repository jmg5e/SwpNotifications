import React, { Component } from 'react';
import { goBack } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from 'api/actions/users';
import auth from 'auth/selectors';
import EditUserPage from './components/EditUserPage';
import users from './selectors';

class EditUser extends Component {
  componentWillMount() {
    if (!this.props.user) {
      this.props.goBack();
    }
  }

  render() {
    return (
      <EditUserPage
        user={this.props.user}
        updateUser={this.props.updateUser}
        goBack={this.props.goBack}
        loggedInUser={this.props.loggedInUser}
      />
    );
  }
}

EditUser.propTypes = {
  updateUser: PropTypes.func.isRequired,
  loggedInUser: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    userName: PropTypes.string,
    isAdmin: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  user: users.getById(state, ownProps),
  loggedInUser: auth.getLoggedInUser(state),
});

const mapDispatchToProps = {
  updateUser,
  goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUser);
