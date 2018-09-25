import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RequestHistory from './RequestHistory';
import ActiveRequests from './ActiveRequests';

const Layout = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  row-gap: 10px;
  height: 100%;
`;

const RequestsPage = ({
  activeRequests,
  requestHistory,
  getRequests,
  dismissRequest,
  clearRequests,
  clearHistory,
}) => (
  <Layout>
    <ActiveRequests
      className="ActiveRequests"
      requests={activeRequests}
      clearRequests={clearRequests}
      getRequests={getRequests}
      dismissRequest={dismissRequest}
    />
    <RequestHistory
      requestHistory={requestHistory}
      clearHistory={clearHistory}
    />
  </Layout>
);

RequestsPage.propTypes = {
  activeRequests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      product: PropTypes.object,
      ellapsedTime: PropTypes.number,
    }),
  ).isRequired,
  requestHistory: PropTypes.arrayOf(
    PropTypes.shape({
      eventId: PropTypes.string,
      products: PropTypes.array,
      timestamp: PropTypes.number,
    }),
  ).isRequired,
  getRequests: PropTypes.func.isRequired,
  dismissRequest: PropTypes.func.isRequired,
  clearRequests: PropTypes.func.isRequired,
  clearHistory: PropTypes.func.isRequired,
};

export default RequestsPage;
