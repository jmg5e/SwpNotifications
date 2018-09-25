import styled from 'styled-components';
import NavMenu from 'components/NavMenu';
import AppHeader from 'components/AppHeader';

export const Layout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  overflow: hidden;
`;

export const Sidebar = styled(NavMenu)`
  grid-area: sidebar;
`;

export const Header = styled(AppHeader)`
  grid-area: header;
`;

export const Content = styled.div`
  grid-area: main;
  background-color: ${props => props.theme.light2};
  overflow: auto;
`;

export default {
  Layout, Content, Header, Sidebar,
};
