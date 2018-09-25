import Types from './types';

export const initialState = {
  connected: false,
  connecting: false,
  errorMessage: '',
  connectionId: null,
};

const defaultErrorMessage = 'Connection Failed.';

const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CONNECTING:
      return { ...initialState, connecting: true };
    case Types.CONNECTION_SUCCEEDED:
      return {
        ...initialState,
        connected: true,
        connectionId: action.connectionId,
      };
    case Types.CONNECTION_FAILED:
      return {
        ...initialState,
        connected: false,
        errorMessage: action.errorMessage || defaultErrorMessage,
      };
    case Types.CONNECTION_CLOSED:
      return {
        ...initialState,
        connected: false,
        errorMessage: action.errorMessage || '',
      };
    default:
      return state;
  }
};

export default connectionReducer;
