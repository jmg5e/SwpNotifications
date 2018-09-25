import {
  requestRecieved,
  requestsLoaded,
  requestsDismissed,
} from 'features/requests/actions';
import {
  clientsLoaded,
  clientConnected,
  clientDisconnected,
  // clientGroupChange,
} from 'features/clients/actions';
import { messageRecieved } from 'features/messages/actions';
import { signalrError } from 'signalR/actions';

export default {
  Error: signalrError,
  Request: requestRecieved,
  Requests: requestsLoaded,
  Clients: clientsLoaded,
  ClientDisconnected: clientDisconnected,
  ClientConnected: clientConnected,
  // ClientGroupChange: clientGroupChanged,
  MessageRecieved: messageRecieved,
  RequestRecieved: requestRecieved,
  RequestDismissed: requestsDismissed,
  RequestsDismissed: requestsDismissed,
};
