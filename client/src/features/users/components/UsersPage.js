import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import UserList from './UserList';

const RefreshButton = styled(Button)`
  margin-left: auto !important;
`;

const UsersPage = ({
  users,
  getUsers,
  newUser,
  editUser,
  deleteUser,
}) => (
  <Page.Layout>
    <Page.Header><span>Users &amp; Groups</span>
      <RefreshButton onClick={getUsers} icon="refresh" content="refresh" />
      <Button onClick={newUser} icon="add" content="Add User" />
    </Page.Header>
    <Page.Main>
      <UserList users={users} editUser={editUser} deleteUser={deleteUser} />
    </Page.Main>
  </Page.Layout>);

UsersPage.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string,
      id: PropTypes.string,
      hubGroups: PropTypes.arrayOf(PropTypes.string.string),
      isAdmin: PropTypes.bool,
      isLocked: PropTypes.bool,
    }),
  ).isRequired,
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  newUser: PropTypes.func.isRequired,
};

export default UsersPage;
