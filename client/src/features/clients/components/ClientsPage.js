import React from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Button,
} from 'semantic-ui-react';
import styled from 'styled-components';
import NewMessageModal from './NewMessageModal';
import Client from './Client';

const Layout = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  row-gap: 10px;
  height: 100%;
`;

const ClientsPage = props => (
  <Layout>
    <Segment.Group>
      <Segment>
        <NewMessageModal
          title="Message All"
          send={props.broadcastMessage}
          renderTrigger={modalProps => (
            <Button
              {...modalProps}
              compact
              size="mini"
              floated="right"
            >
        Message All
            </Button>
          )}
        />
        <Button
          icon="refresh"
          onClick={props.getConnectedClients}
          content="Refresh"
          compact
          size="mini"
          floated="right"
        />
      Connected Clients
      </Segment>
      <Segment secondary style={{ overflow: 'auto' }}>
        {props.clients.map(client => (
          <Client key={client.id} client={client} messageClient={props.messageClient} />
        ))}
      </Segment>
    </Segment.Group>
  </Layout>
);

ClientsPage.propTypes = {
  // eslint-disable-next-line
  currentClient: PropTypes.object.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  messageClient: PropTypes.func.isRequired,
  getConnectedClients: PropTypes.func.isRequired,
  broadcastMessage: PropTypes.func.isRequired,
};

export default ClientsPage;
