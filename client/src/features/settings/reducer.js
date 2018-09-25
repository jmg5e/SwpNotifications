import Types from './types';

export const initialState = {
  server: '',
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SETTINGS_UPDATED:
      return { ...state, ...action.settings };
    case Types.SETTINGS_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default settingsReducer;
