import Types from './types';

export const requestsLoaded = requests => ({
  type: Types.REQUESTS_LOADED,
  requests,
});

export const requestRecieved = (request, clientId) => ({
  type: Types.REQUEST_RECIEVED,
  request: { ...request, clientId },
});

export const productRequestSuccess = (request, clientId) => ({
  type: Types.PRODUCT_REQUEST_SUCCESS,
  request: { ...request, clientId },
});

export const requestDismissed = event => ({
  type: Types.REQUEST_DISMISSED,
  event,
});

export const requestsDismissed = event => ({
  type: Types.REQUESTS_DISMISSED,
  event,
});

export const requestsDismissedSuccess = event => ({
  type: Types.REQUESTS_DISMISSED_SUCCESS,
  event,
});

export const clearHistory = () => ({
  type: Types.HISTORY_CLEARED,
});
