import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import LoginModal from './LoginModal';

const UserDropdown = ({
  authenticated,
  authenticating,
  user,
  login,
  logout,
  errorMessage,
}) => (authenticated ? (
  <Dropdown icon="dropdown" pointing="top right" text={user.userName}>
    <Dropdown.Menu>
      <Dropdown.Item icon="sign out" text="Logout" onClick={logout} />
    </Dropdown.Menu>
  </Dropdown>
) : (
  <Dropdown icon="user plus" pointing="top right">
    <Dropdown.Menu>
      <LoginModal
        authenticating={authenticating}
        errorMessage={errorMessage}
        login={login}
        renderTrigger={triggerProps => (
          <Dropdown.Item icon="user" text="Login" {...triggerProps} />
        )}
      />
    </Dropdown.Menu>
  </Dropdown>
));

UserDropdown.defaultProps = { user: { userName: '' } };

UserDropdown.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  authenticating: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userName: PropTypes.string,
    isAdmin: PropTypes.bool,
  }),
};

export default UserDropdown;
