import Types from './types';

export const InitialState = {
  connected: false,
  connecting: false,
  errorMessage: '',
};

const defaultErrorMessage = 'Connection Failed.';

const connectionReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.CONNECTING:
      return { ...InitialState, connecting: true };
    case Types.CONNECTION_SUCCEEDED:
      return { ...InitialState, connected: true, errorMessage: '' };
    case Types.CONNECTION_FAILED:
      return {
        ...InitialState,
        connected: false,
        errorMessage: action.errorMessage || defaultErrorMessage,
      };
    case Types.CONNECTION_CLOSED:
      return {
        ...InitialState,
        connected: false,
        errorMessage: action.errorMessage || '',
      };
    default:
      return state;
  }
};

export default connectionReducer;
