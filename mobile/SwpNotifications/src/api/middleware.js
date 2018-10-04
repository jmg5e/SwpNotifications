import Types from './types';
// import { validateApiAction } from 'utils/validateActions';

export const startNetwork = label => ({
  type: Types.START_NETWORK,
  label,
});

export const endNetwork = label => ({
  type: Types.END_NETWORK,
  label,
});

export const apiError = (label, errorMessage) => ({
  type: Types.API_ERROR,
  label,
  errorMessage,
});

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

// TODO
// normalize server and endPoint to valid url
const apiMiddleware = ({ dispatch, getState }) => next => async (action) => {
  if (action.type !== Types.API) {
    next(action);
    return;
  }

  const {
    endPoint, label, success, requestOptions, start,
  } = action;

  // try {
  //   validateApiAction(action);
  // } catch (err) {
  //   next(apiError(label, err.message));
  //   return;
  // }

  try {
    const { server } = getState().settings;
    next(startNetwork(label));
    if (typeof start === 'function') dispatch(start());
    const result = await fetch(`${server}${endPoint}`, requestOptions)
      .then(handleErrors)
      .then((response) => {
        const contentType = response.headers.get('content-type');
        return contentType && contentType.indexOf('application/json') !== -1
          ? response.json()
          : response.text();
      });

    next(endNetwork(label));
    if (typeof success === 'function') dispatch(success(result));
  } catch (err) {
    const { failed } = action;

    if (typeof failed === 'function') {
      dispatch(failed(err.message));
    }
    /* only really used to help with debugging */
    next(apiError(label, err.message));
    next(endNetwork(label));
  }
};

export default apiMiddleware;
