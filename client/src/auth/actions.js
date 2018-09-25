import Types from './types';

export const loginSuccess = user => ({
  type: Types.LOGIN_SUCCESS,
  user,
});

export const loginFailed = (errorMessage = 'Login Failed') => ({
  type: Types.LOGIN_FAILED,
  errorMessage,
});

export const logout = () => ({
  type: Types.LOGOUT,
});

export const authenticating = () => ({
  type: Types.AUTHENTICATING,
});

export const tokenRenewSuccess = user => ({
  type: Types.TOKEN_RENEW_SUCCESS,
  user,
});

export const tokenRenewFailed = errorMessage => ({
  type: Types.TOKEN_RENEW_FAILED,
  errorMessage,
});
