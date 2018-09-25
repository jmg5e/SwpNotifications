import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import UserForm from './UserForm';

const EditUserPage = ({
  user, loggedInUser, updateUser, goBack,
}) => (
  <Page.Layout>
    <Page.Header>Edit User</Page.Header>
    <Page.Main>
      <UserForm
        initialValues={user}
        user={user}
        loggedInUser={loggedInUser}
        mode="edit"
        handleCancel={goBack}
        onSubmit={updateUser}
      />
    </Page.Main>
  </Page.Layout>
);

EditUserPage.defaultProps = {};

EditUserPage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    userName: PropTypes.string,
    isAdmin: PropTypes.bool,
  }).isRequired,
  goBack: PropTypes.func.isRequired,
  loggedInUser: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default EditUserPage;
