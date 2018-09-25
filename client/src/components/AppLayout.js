import styled from 'styled-components';

export const Layout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
`;

export const Main = styled.div`
  grid-area: main;
  background-color: ${props => props.theme.light2};
  overflow: auto;
`;

export default { Layout, Main };
