import Types from './types';

export const startNetwork = label => ({
  type: Types.START_NETWORK,
  label,
});

export const endNetwork = label => ({
  type: Types.END_NETWORK,
  label,
});

export const apiError = (label, errorMessage) => ({
  type: Types.API_ERROR,
  label,
  errorMessage,
});

export const authError = (label, errorMessage) => ({
  type: Types.API_AUTHENTICATION_ERROR,
  label,
  errorMessage,
});
