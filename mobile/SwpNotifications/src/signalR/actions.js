import Types from './types';

export const signalrError = (label, errorMessage) => ({
  type: Types.SIGNALR_ERROR,
  label,
  errorMessage,
});

export const connectToHub = clientIdentifier => ({
  type: Types.SIGNALR_CONNECT,
  clientIdentifier,
});

export const disconnect = () => ({
  type: Types.SIGNALR_DISCONNECT,
});

export const requestProduct = productId => ({
  type: Types.SIGNALR,
  label: 'requestProduct',
  method: 'RequestProduct',
  args: [productId],
  // success: requestActions.productRequestSuccess,
  // failed: toastrError('Product Request Failed.'),
});

export const requestProducts = productIds => ({
  type: Types.SIGNALR,
  label: 'requestProducts',
  method: 'RequestProducts',
  args: [productIds],
  // failed: toastrError('Product Request Failed.'),
});
