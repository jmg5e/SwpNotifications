import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import UserForm from './UserForm';

const EditUserPage = ({
  user, currentUser, updateUser, goBack,
}) => (
  <Page.Layout>
    <Page.Header>Edit User: {user.userName}</Page.Header>
    <Page.Main>
      <UserForm
        initialValues={user}
        user={user}
        currentUser={currentUser}
        mode="edit"
        handleCancel={goBack}
        onSubmit={updateUser}
      />
    </Page.Main>
  </Page.Layout>
);

EditUserPage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    userName: PropTypes.string,
    isAdmin: PropTypes.bool,
  }).isRequired,
  goBack: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default EditUserPage;
