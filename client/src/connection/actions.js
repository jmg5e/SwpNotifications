import Types from './types';

export const connecting = () => ({
  type: Types.CONNECTING,
});

export const connectionSuccess = client => ({
  type: Types.CONNECTION_SUCCEEDED,
  client,
});

export const connectionFailed = errorMessage => ({
  type: Types.CONNECTION_FAILED,
  errorMessage,
});

export const connectionClosed = () => ({
  type: Types.CONNECTION_CLOSED,
});
