import { validateApiAction } from 'utils/validateActions';
import getAccessToken from 'api/getAccessToken';
import { handleErrors, transformResponse, requestWithAuth } from 'api/helpers';
import {
  apiError, authError, endNetwork, startNetwork,
} from './actions';
import Types from './types';


// TODO
// normalize server and endPoint to valid url
const apiMiddleware = store => next => async (action) => {
  if (action.type !== Types.API && action.type !== Types.API_AUTHENTICATED) {
    next(action);
    return;
  }

  const { dispatch, getState } = store;
  const {
    endPoint, label, failed, success, requestOptions = {}, start,
  } = action;

  try {
    validateApiAction(action);
  } catch (err) {
    next(apiError(label, err.message));
    return;
  }

  if (action.type === Types.API) {
    try {
      const { server } = getState().settings;

      next(startNetwork(label, action));
      if (typeof start === 'function') dispatch(start());
      const result = await fetch(`${server}${endPoint}`, requestOptions)
        .then(handleErrors)
        .then((transformResponse));

      next(endNetwork(label));
      if (typeof success === 'function') dispatch(success(result));
    } catch (error) {
      if (typeof failed === 'function') {
        dispatch(failed(error.message));
      }
      /* only really used to help with debugging */
      next(apiError(label, error.message));

      next(endNetwork(label));
    }
  }

  if (action.type === Types.API_AUTHENTICATED) {
    try {
      const accessToken = await getAccessToken(store);
      if (!accessToken) {
        next(authError(action.label));
        return;
      }
      //
      dispatch(requestWithAuth(action, accessToken));
    } catch (error) {
      if (typeof failed === 'function') {
        dispatch(failed(error.message));
      }
      /* only really used to help with debugging */
      next(authError(label, error.message));

      next(endNetwork(label));
    }
  }
};


export default apiMiddleware;
