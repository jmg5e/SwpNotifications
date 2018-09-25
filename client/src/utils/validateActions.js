export const validateApiAction = ({ endPoint, success, failed }) => {
  if (typeof endPoint !== 'string') {
    throw Error('api invalid action: action.endPoint');
  }

  if (success && typeof success !== 'function') {
    throw Error('api invalid action: action.succes');
  }

  if (failed && typeof failed !== 'function') {
    throw Error('api invalid action: action.failed');
  }
};

export const validateSignalrAction = ({ method, success, failed }) => {
  if (typeof method !== 'string') {
    throw Error('signalr invalid action: action.method');
  }
  if (success && typeof success !== 'function') {
    throw Error('signalr invalid action: action.success');
  }

  if (failed && typeof failed !== 'function') {
    throw Error('signalr invalid action: action.failed');
  }
};
