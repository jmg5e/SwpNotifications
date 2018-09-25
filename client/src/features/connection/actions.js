import Types from './types';

export const connecting = () => ({
  type: Types.CONNECTING,
});

export const connectionSuccess = connectionId => ({
  type: Types.CONNECTION_SUCCEEDED,
  connectionId,
});

export const connectionFailed = errorMessage => ({
  type: Types.CONNECTION_FAILED,
  errorMessage,
});

export const disconnected = () => ({
  type: Types.CONNECTION_CLOSED,
});
