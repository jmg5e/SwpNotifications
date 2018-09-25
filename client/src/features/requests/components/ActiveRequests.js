import React from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Button, Popup, Icon, Label,
} from 'semantic-ui-react';
import styled from 'styled-components';

/* TODO break this into seperate component */
const RequestContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  grid-column-gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const ActiveRequests = ({
  requests,
  dismissRequest,
  clearRequests,
  getRequests,
}) => (
  <Segment.Group>
    <Segment>
      <Button compact size="mini" floated="right" onClick={clearRequests}>
        Acknowledge All
      </Button>
      <Button
        icon="refresh"
        onClick={getRequests}
        content="Refresh"
        compact
        size="mini"
        floated="right"
      />
      Active Requests
    </Segment>
    <Segment secondary style={{ overflow: 'auto' }}>
      {requests.map(request => (
        <RequestContainer key={request.id}>
          <Popup
            trigger={<Icon name="info" />}
            content={JSON.stringify(request, null, 2)}
          />
          <div>
            {request.clientIdentifier} requested
            <Popup
              trigger={<Label content={request.product.name} />}
              content={`floor: ${request.product.location.floor}, location: ${request.product.location.moniker}, slot: ${
                request.product.slot
              }`}
            />
          </div>
          <div>sent: {request.ellapsedTime} minutes ago</div>
          <Button
            icon="delete"
            onClick={() => dismissRequest(request.id)}
            content="Acknowledge"
            compact
            size="mini"
          />
        </RequestContainer>
      ))}
    </Segment>
  </Segment.Group>
);

ActiveRequests.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        location: PropTypes.object,
        floor: PropTypes.object,
      }),
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  dismissRequest: PropTypes.func.isRequired,
  clearRequests: PropTypes.func.isRequired,
  getRequests: PropTypes.func.isRequired,
};

export default ActiveRequests;
