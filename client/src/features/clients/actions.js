import Types from './types';

export const clientsLoaded = clients => ({
  type: Types.CLIENTS,
  clients,
});

export const clientConnected = client => ({
  type: Types.CLIENT_CONNECTED,
  client,

});

export const clientDisconnected = client => ({
  type: Types.CLIENT_DISCONNECTED,
  client,
});

// export const clientGroupChange = client => ({
//   type: Types.CLIENT_GROUP_CHANGE,
//   client,
// });
