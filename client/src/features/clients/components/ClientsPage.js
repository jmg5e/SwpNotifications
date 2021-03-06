import React from 'react';
import styled from 'styled-components';
import Clients from 'features/clients/Clients';

const Layout = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  row-gap: 10px;
  height: 100%;
`;

const ClientsPage = () => (
  <Layout>
    <Clients />
  </Layout>
);

export default ClientsPage;
