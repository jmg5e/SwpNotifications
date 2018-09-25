import { tokenIsExpired } from 'utils/jwt';
import { handleErrors, transformResponse } from 'api/helpers';
import { tokenRenewSuccess, tokenRenewFailed } from 'auth/actions';
import { path } from 'ramda';

const renewToken = (refreshToken, server = null) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(refreshToken),
  };

  return fetch(`${server}/api/auth/renew`, requestOptions)
    .then(handleErrors)
    .then((transformResponse));
};

const accessTokenFactory = async ({ dispatch, getState }) => {
  const state = getState();
  const accessToken = path(['auth', 'user', 'accessToken'], state);

  if (!accessToken) return null;
  if (!tokenIsExpired(accessToken)) return accessToken;

  const refreshToken = path(['auth', 'user', 'refreshToken'], state);
  if (!refreshToken) { // expired but no refresh token
    dispatch(
      tokenRenewFailed('failed to renew expired authorization token'),
    );
    return null;
  }

  // renew token
  try {
    const server = path(['settings', 'server'], state);

    const response = await renewToken(refreshToken, server);
    dispatch(tokenRenewSuccess(response));

    return response.accessToken;
  } catch (err) {
    dispatch(tokenRenewFailed(err.message));
    return null;
  }
};

export default accessTokenFactory;
