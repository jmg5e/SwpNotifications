import styled from 'styled-components';

export const Layout = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  row-gap: 10px;

  grid-template-areas:
    "header"
    "topBar"
    "main"
    "bottomBar";
`;

export const Header = styled.div`
  grid-area: header;
  display: flex;
  font-size: 1.5em;
  height: 50px;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  color: ${props => props.theme.dark2};
`;

export const Main = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const TopBar = styled.div`
  grid-area: topBar;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
`;

export const BottomBar = styled.div`
  grid-area: bottomBar;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
`;

export default {
  Layout,
  Header,
  Main,
  TopBar,
  BottomBar,
};
