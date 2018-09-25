import { toastrError } from 'notifications/toastr';
import Types from 'signalR/types';
import * as requestActions from 'features/requests/actions';

export const signalrError = (label, errorMessage) => ({
  type: Types.SIGNALR_ERROR,
  label,
  errorMessage,
});

export const connectToHub = user => ({
  type: Types.SIGNALR_CONNECT,
  user,
});

export const disconnect = () => ({
  type: Types.SIGNALR_DISCONNECT,
});

export const messageClient = (clientId, message) => ({
  type: Types.SIGNALR,
  label: `message: ${clientId}`,
  method: 'SendMessage',
  args: [clientId, message],
  failed: toastrError('Failed to send message.'),
});

export const broadcastMessage = message => ({
  type: Types.SIGNALR,
  label: 'broadcastMessage',
  method: 'BroadcastMessage',
  args: [message],
  // success: () => toastrSuccess('Message Sent')(message),
  failed: toastrError('Broadcast Message Failed.'),
});

export const sendGroupMessage = (groupName, message) => ({
  type: Types.SIGNALR,
  label: `group message: ${groupName}`,
  method: 'SendGroupMessage',
  args: [groupName, message],
  failed: toastrError('Send Group Message Failed.'),
});

export const getConnectedClients = () => ({
  type: Types.SIGNALR,
  label: 'GetConnectedClients',
  method: 'GetConnectedClients',
  args: [],
  failed: toastrError('Could not get client list.'),
});

// export const joinGroup = groupName => ({
//   type: Types.SIGNALR,
//   label: `join group: ${groupName}`,
//   method: 'JoinGroup',
//   args: [groupName],
//   // success: toastrSuccess(`Joined Group ${groupName}.`),
//   failed: toastrError(`Failed to Join Group: ${groupName}.`),
// });

export const getRequests = () => ({
  type: Types.SIGNALR,
  label: 'Get Requests',
  method: 'GetRequests',
  args: [],
  failed: toastrError('Could not load product requests.'),
});

export const requestProduct = productId => ({
  type: Types.SIGNALR,
  label: 'requestProduct',
  method: 'RequestProduct',
  args: [productId],
  success: requestActions.productRequestSuccess,
  failed: toastrError('Product Request Failed.'),
});

export const requestProducts = productIds => ({
  type: Types.SIGNALR,
  label: 'requestProducts',
  method: 'RequestProducts',
  args: [productIds],
  failed: toastrError('Product Request Failed.'),
});

export const dismissRequest = requestId => ({
  type: Types.SIGNALR,
  label: `dismiss request: ${requestId}`,
  method: 'DismissRequest',
  failed: toastrError('Dismiss Product Request Failed.'),
  success: requestActions.requestsDismissedSuccess,
  args: [requestId],
});

export const clearRequests = () => ({
  type: 'SIGNALR',
  label: 'dismiss all requests',
  method: 'DismissAllRequests',
  success: requestActions.requestsDismissedSuccess,
  failed: toastrError('Dismiss All Request Failed.'),
});
