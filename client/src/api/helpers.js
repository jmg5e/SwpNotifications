import Types from 'api/types';
import * as R from 'ramda';

export const handleErrors = async (response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    throw new Error(response.statusText);
  }
  return response;
};

export const transformResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  return contentType && contentType.indexOf('application/json') !== -1
    ? response.json()
    : response.text();
};

export const requestWithAuth = (action, accessToken) => R.mergeDeepLeft(
  { type: Types.API, requestOptions: { headers: { Authorization: `Bearer ${accessToken}` } } }, action,
);
