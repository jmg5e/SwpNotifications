import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import NewMessageModal from './NewMessageModal';

const ClientContainer = styled.div`
  padding: 5px;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    "info clientName actions"
    "info clientIp actions";
  /* background-color: white; */
  border-bottom: 1px solid black;
`;

const Info = styled.div`
  grid-area: info;
  align-self: center;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
`;

// const MessageModal = styled(NewMessageModal)`
//   grid-area: actions;
//   align-self: center;
//   justify-content: center;
//   align-items: center;
// `;

const MessageButton = styled(Button)`
  grid-area: actions;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const ClientName = styled.div`
  grid-area: clientName;
`;

const ClientIp = styled.div`
  grid-area: clientIp;
  color: blue,
`;

const Client = ({ client, messageClient }) => (
  <ClientContainer>
    <Info>
      <Popup
        trigger={<Icon name="info" />}
        content={JSON.stringify(client, null, 2)}
      />
    </Info>
    <ClientName>{client.identifier}</ClientName>
    <ClientIp>{client.ip}</ClientIp>
    <NewMessageModal
      title={`Message ${client.identifier}`}
      send={text => messageClient(client.id, text)}
      renderTrigger={modalProps => (
        <MessageButton
          {...modalProps}
          icon="comment"
          content="Message"
          compact
          size="mini"
        />
      )}
    />
  </ClientContainer>
);

Client.propTypes = {
  messageClient: PropTypes.func.isRequired,
  client: PropTypes.shape({
    id: PropTypes.string,
    ip: PropTypes.string,
    identifier: PropTypes.string,

  }).isRequired,
};

export default Client;
