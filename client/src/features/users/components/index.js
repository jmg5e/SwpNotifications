import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import { Button, Card } from 'semantic-ui-react';
import styled from 'styled-components';

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
      <Card.Group>

        {users.map(user => (
          <Card key={user.id}>
            <Card.Content>
              <Card.Header>{user.userName}</Card.Header>
              {user.isAdmin && <Card.Meta>Admin</Card.Meta>}
              <Card.Description>
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green" onClick={() => editUser(user)}>
                  Edit
                </Button>
                <Button basic color="red" onClick={() => deleteUser(user.id)}>
                delete
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Page.Main>
  </Page.Layout>);

UsersPage.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  newUser: PropTypes.func.isRequired,
};

export default UsersPage;
