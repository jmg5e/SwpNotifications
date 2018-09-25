import Types from 'api/types';
import * as actions from 'auth/actions';

export const login = ({ userName, password }) => ({
  type: Types.API,
  label: 'Login',
  endPoint: '/api/auth/token',
  success: actions.loginSuccess,
  failed: actions.loginFailed,
  start: actions.authenticating,
  requestOptions: {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password }),
  },
});

export const renewToken = (refreshToken, delayedAction) => ({
  type: Types.API,
  label: 'Renew Token',
  endPoint: '/api/auth/renew',
  success: actions.tokenRenewSuccess(delayedAction),
  failed: errorMessage => ({
    type: 'TOKEN_RENEW_FAILED',
    errorMessage,
    delayedAction,
  }),
  requestOptions: {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(refreshToken),
  },
});
