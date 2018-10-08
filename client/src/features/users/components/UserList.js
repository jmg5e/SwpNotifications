import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import User from './User';

const UserList = ({ users, editUser, deleteUser }) => (
  <Card.Group>
    {users.map(user => (
      <User
        key={user.id}
        user={user}
        editUser={() => editUser(user.id)}
        deleteUser={() => deleteUser(user)}
      />
    ))}
  </Card.Group>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string,
      id: PropTypes.string,
      hubGroups: PropTypes.arrayOf(PropTypes.string),
      isAdmin: PropTypes.bool,
      isLocked: PropTypes.bool,
    }),
  ).isRequired,
  deleteUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
};

export default UserList;
