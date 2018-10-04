import Types from './types';

export const connecting = () => ({
  type: Types.CONNECTING,
});

export const connectionSuccess = () => ({
  type: Types.CONNECTION_SUCCEEDED,
});

export const connectionFailed = errorMessage => ({
  type: Types.CONNECTION_FAILED,
  errorMessage,
});

export const disconnected = () => ({
  type: Types.CONNECTION_CLOSED,
});
