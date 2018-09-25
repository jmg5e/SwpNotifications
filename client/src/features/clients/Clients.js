import React from 'react';
import {
  messageClient,
  broadcastMessage,
  getConnectedClients,
} from 'signalR/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClientsPage from './components/ClientsPage';
import selector from './selectors';

const Clients = props => (
  <ClientsPage
    clients={props.clients}
    messageClient={props.messageClient}
    getConnectedClients={props.getConnectedClients}
    broadcastMessage={props.broadcastMessage}
    currentClient={props.currentClient}
  />
);

Clients.propTypes = {
  // eslint-disable-next-line
  currentClient: PropTypes.object.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  messageClient: PropTypes.func.isRequired,
  getConnectedClients: PropTypes.func.isRequired,
  broadcastMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  clients: selector.getOtherClients(state),
  currentClient: selector.getCurrentClient(state),
});

const mapDispatchToProps = {
  messageClient,
  broadcastMessage,
  getConnectedClients,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Clients);
