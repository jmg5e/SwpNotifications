import React from 'react';
import styled from 'styled-components';
import Messages from 'features/messages/Messages';

const Layout = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr;
  row-gap: 10px;
  width: 100%;
  height: 100%;
`;

const MessagesPage = () => (
  <Layout>
    <Messages />
  </Layout>
);

export default MessagesPage;
