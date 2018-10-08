import React from 'react';
import {
  Card, Icon, Button, Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UserInfo = styled(Card.Description)`
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding-top: 20px;
`;

const UserInfoRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 5px;
  box-shadow: 0px 0px 2px 2px #EAEDF3;
`;

const User = ({ user, deleteUser, editUser }) => (
  <Card>
    <Card.Content>
      <Card.Header>{user.userName}</Card.Header>
      {user.isAdmin && <Card.Meta>Admin</Card.Meta>}
      <UserInfo>
        <UserInfoRow style={{ gridRowStart: 1 }}>
          <Label>
            <Icon name={user.isLocked ? 'lock' : 'unlock'} />
            Locked
          </Label>
          <div style={{ textAlign: 'center' }}>
            {user.isLocked ? <span>yes</span> : <span>no</span>}
          </div>
        </UserInfoRow>
        <UserInfoRow style={{ gridRowStart: 2 }}>
          <Label>
            <Icon name="group" />
            Groups
          </Label>
          <div style={{ textAlign: 'center' }}>
            {user.hubGroups.map(group => (
              <span key={group}>{group}, </span>
            ))}
          </div>
        </UserInfoRow>
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      </UserInfo>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="green" onClick={editUser}>
          Edit
        </Button>
        <Button basic color="red" onClick={deleteUser}>
          delete
        </Button>
      </div>
    </Card.Content>
  </Card>
);

User.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string,
    id: PropTypes.string,
    hubGroups: PropTypes.arrayOf(PropTypes.string),
    isAdmin: PropTypes.bool,
    isLocked: PropTypes.bool,
  }).isRequired,
  deleteUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
};

export default User;
