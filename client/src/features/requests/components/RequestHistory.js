import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Label } from 'semantic-ui-react';
import styled from 'styled-components';

/* TODO break this into seperate component */
const RequestEventContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const RequestHistory = ({ requestHistory, clearHistory }) => (
  <Segment.Group>
    <Segment>
      <Button compact size="small" floated="right" onClick={clearHistory}>
        Clear
      </Button>
      <span>History</span>
    </Segment>
    <Segment secondary style={{ overflow: 'auto' }}>
      {requestHistory.map(event => (
        <RequestEventContainer key={event.eventId}>
          <div>{new Date(event.timeStamp).toLocaleTimeString()}</div>
          <div>
            {event.dismissedBy} acknowledged requests for:
          </div>
          <div>
            {event.products.map(p => (
              <Label key={p.id}>{p.name}</Label>
            ))}
          </div>
        </RequestEventContainer>
      ))}
    </Segment>
  </Segment.Group>
);

RequestHistory.propTypes = {
  requestHistory: PropTypes.arrayOf(
    PropTypes.shape({
      eventId: PropTypes.string,
      dismissedBy: PropTypes.string,
      timeStamp: PropTypes.string,
      ids: PropTypes.arrayOf(PropTypes.number),
      products: PropTypes.arrayOf(PropTypes.object),
    }),
  ).isRequired,
  clearHistory: PropTypes.func.isRequired,
};

export default RequestHistory;
