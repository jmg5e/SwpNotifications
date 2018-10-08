import React from 'react';
import ActiveRequests from 'features/requests/ActiveRequests';
import Clients from 'features/clients/Clients';
import Messages from 'features/messages/Messages';
import IfAuthenticated from 'auth/IfAuthenticated';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  padding: 20px;
  grid-auto-rows: 1fr;
  /* grid-auto-columns: auto 1fr; */
  row-gap: 10px;
  column-gap: 10px;
  width: 100%;
  height: 100%;
`;


const DashBoard = () => (
  <Layout>
    <IfAuthenticated requiredGroup="RequestListener">
      <ActiveRequests />
    </IfAuthenticated>
    <IfAuthenticated requiredGroup="ClientListener">
      <Clients />
    </IfAuthenticated>
    <Messages />
  </Layout>
);

export default DashBoard;
