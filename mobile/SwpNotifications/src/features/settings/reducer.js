import Types from './types';

export const InitialState = {
  server: 'http://192.168.0.182:5000',
  // serverIp: '192.168.0.182',
  // port: 5000,
  // protocol: 'http',
};

const settingsReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.SETTINGS_UPDATED:
      return { ...state, ...action.settings };
    case Types.SETTINGS_RESET:
      return { ...InitialState };
    default:
      return state;
  }
};

export default settingsReducer;
