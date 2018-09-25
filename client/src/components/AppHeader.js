import React from 'react';
import { Link } from 'react-router-dom';
import WithAuth from 'auth/WithAuth';
import UserDropdown from 'auth/components/UserDropdown';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Dropdown } from 'semantic-ui-react';

const Header = styled.div`
  background-color: ${props => props.theme.light1}
  color: ${props => props.theme.dark1}
  height: 50px;
  display: grid;
  grid-area: header;
  grid-template-areas: "sidebarMenuToggle title user menu";
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
`;

const SideMenuToggle = styled(Icon)`
  grid-area: sidebarMenuToggle;
  &&& {
    @media only screen and (min-width: 992px) {
      display: none;
    }
    padding-left: 20px;
  }
`;

const Title = styled.span`
  font-size: 1.2em;
  grid-area: title;
  padding-left: 20px;
  @media only screen and (max-width: 992px) {
    text-align: center;
  }
  color: ${props => props.theme.dark2};
`;

const UserArea = styled.div`
  grid-area: user;
  padding-right: 30px;
`;

const Menu = styled(Dropdown)`
  grid-area: menu;
  padding-right: 10px;
`;

const AppHeader = ({ disconnect, toggleSidebar }) => (
  <Header>
    <SideMenuToggle name="sidebar" onClick={() => toggleSidebar()} />
    <Title>SwpNotifications</Title>
    <UserArea>
      <WithAuth render={props => <UserDropdown {...props} />} />
    </UserArea>
    <Menu icon="ellipsis vertical" pointing="top right">
      <Dropdown.Menu>
        <Dropdown.Item
          icon="settings"
          text="Settings"
          as={Link}
          to="/settings"
        />
        <Dropdown.Item
          icon="plug"
          text="Disconnect"
          onClick={disconnect}
        />
      </Dropdown.Menu>
    </Menu>
  </Header>
);

AppHeader.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
};

export default AppHeader;
