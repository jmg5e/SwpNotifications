import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IfAuthenticated from 'auth/IfAuthenticated';

const Container = styled.section`
  background: ${props => props.theme.dark2}
  border-top: 1px solid ${props => props.theme.accent};
  color: ${props => props.theme.light2}
  width: ${props => props.theme.sideBarWidth || '250px'}
  grid-area: sidebar;
  transition: 0.3s;
  @media only screen and (max-width: 992px) {
    height: 100%;
    width: ${props => (props.isOpen ? '250px' : '0px')};
    position: fixed;
    z-index: 1;
    top: 50px;
    left: 0;
    overflow-x: hidden;
  }
`;

const NavItem = styled(NavLink)`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  column-gap: 10px;
  color: ${props => props.theme.light1}
  text-decoration: none;
  font-weight: 400;
  padding: 15px 30px;

  &:hover {
    transition: all 0.3s ease-in-out;
    background: ${props => props.theme.dark1}
    color: ${props => props.theme.light1}
    font-weight: 500;
    padding: 15px 30px 15px 30px;
  }

  &.active {
    font-weight: 600;
    background: ${props => props.theme.dark1}
    border-left: 5px solid ${props => props.theme.accent}; //$blue;
    padding: 15px 30px 15px 25px;
  }
`;

const NavMenu = ({
  isOpen, closeSideBar, requestCount, messageCount,
}) => (
  <Container isOpen={isOpen}>
    <nav>
      <NavItem exact to="/" activeClassName="active" onClick={closeSideBar}>
        <Icon name="home" />
        <span>Home</span>
      </NavItem>
      <NavItem to="/products" activeClassName="active" onClick={closeSideBar}>
        <Icon name="list" />
        <span>Products</span>
      </NavItem>
      <NavItem to="/locations" activeClassName="active" onClick={closeSideBar}>
        <Icon name="pin" />
        <span>Locations</span>
      </NavItem>
      <NavItem to="/messages" activeClassName="active" onClick={closeSideBar}>
        <Icon name="comment" />
        <span>Messages</span>
        {messageCount > 0 && <Label circular>{messageCount}</Label>}
      </NavItem>
      <IfAuthenticated requiredGroup="RequestListener">
        <NavItem to="/requests" activeClassName="active" onClick={closeSideBar}>
          <Icon name="alarm" />
          <span>Requests</span>
          {requestCount > 0 && <Label circular>{requestCount}</Label>}
        </NavItem>
      </IfAuthenticated>
      <IfAuthenticated requiredGroup="ClientListener">
        <NavItem to="/clients" activeClassName="active" onClick={closeSideBar}>
          <Icon name="desktop" />
          <span>Clients</span>
        </NavItem>
      </IfAuthenticated>
      <IfAuthenticated requireAdmin>
        <NavItem to="/users" activeClassName="active" onClick={closeSideBar}>
          <Icon name="users" />
          <span>Users</span>
        </NavItem>
      </IfAuthenticated>
    </nav>
  </Container>
);

NavMenu.defaultProps = {
  messageCount: 0,
};

NavMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeSideBar: PropTypes.func.isRequired,
  requestCount: PropTypes.number.isRequired,
  messageCount: PropTypes.number,
};

export default NavMenu;
