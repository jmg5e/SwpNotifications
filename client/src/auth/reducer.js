import Types from './types';

export const initialState = {
  authenticated: false,
  authenticating: false,
  errorMessage: '',
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.AUTHENTICATING:
      return { ...state, authenticating: true };
    case Types.LOGIN_SUCCESS:
    case Types.TOKEN_RENEW_SUCCESS:
      return {
        ...state,
        authenticated: true,
        authenticating: false,
        errorMessage: '',
        user: action.user,
      };
    case Types.LOGIN_FAILED:
      return {
        ...initialState,
        errorMessage: action.errorMessage,
      };
    case Types.LOGOUT:
    case Types.TOKEN_RENEW_FAILED:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
