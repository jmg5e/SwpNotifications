import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import RequestHistory from 'features/requests//RequestHistory';
import ActiveRequests from 'features/requests/ActiveRequests';

const Layout = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  row-gap: 10px;
  height: 100%;
`;

const RequestsPage = (
) => (
  <Layout>
    <ActiveRequests />
    <RequestHistory />
  </Layout>
);

export default RequestsPage;
