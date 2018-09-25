import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import UserForm from './UserForm';

const NewUserPage = ({
  createUser, goBack,
}) => (
  <Page.Layout>
    <Page.Header>Create User</Page.Header>
    <Page.Main>
      <UserForm
        mode="create"
        handleCancel={goBack}
        onSubmit={createUser}
      />
    </Page.Main>
  </Page.Layout>
);

NewUserPage.defaultProps = {};

NewUserPage.propTypes = {
  goBack: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
};

export default NewUserPage;
