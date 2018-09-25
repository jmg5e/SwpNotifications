import Types from './types';

export const initialState = false;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.START_NETWORK:
      return true;
    case Types.END_NETWORK:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
