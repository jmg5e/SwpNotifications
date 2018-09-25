import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { validateSignalrAction } from 'utils/validateActions';
import * as connectionActions from 'features/connection/actions';
import {
  signalrError,
} from 'signalR/actions';
import Types from 'signalR/types';
import AuthTypes from 'auth/types';
import getAccessToken from 'api/getAccessToken';
import eventHandler from 'signalR/eventHandler';

export default (function signalrMiddleware() {
  let hub = null;

  return store => next => async (action) => {
    next(action);
    const { dispatch, getState } = store;
    switch (action.type) {
      case Types.SIGNALR_CONNECT:
      case AuthTypes.LOGIN_SUCCESS:
      case AuthTypes.LOGOUT:
        try {
          if (hub !== null) {
            await hub.stop();
          }
          const { server } = getState().settings;

          dispatch(connectionActions.connecting());
          const queryIdentifier = action.user ? `?clientIdentifier=${action.user}` : '';
          hub = new HubConnectionBuilder()
            .withUrl(`${server}/SwpHub${queryIdentifier}`, {
              accessTokenFactory: () => getAccessToken(store),
            })
            .configureLogging(LogLevel.Information)
            .build();

          eventHandler(hub, store);
          await hub.start();

          const connectionId = await hub.invoke('GetConnectionId');
          dispatch(connectionActions.connectionSuccess(connectionId));
        } catch (err) {
          dispatch(connectionActions.connectionFailed(err.message));
        }
        break;
      case Types.SIGNALR_DISCONNECT:
        if (hub !== null) {
          hub.stop();
        }
        dispatch(connectionActions.disconnected());
        break;
      case Types.SIGNALR:
        try {
          validateSignalrAction(action);
          const { method, success, args = [] } = action;

          // await hub.invoke(method, payload, 'hello');
          const result = await hub.invoke(method, ...args);
          // console.log(result);
          if (typeof success === 'function') {
            dispatch(success(result));
          }
        } catch (err) {
          const { label, failed } = action;

          if (typeof failed === 'function') {
            dispatch(failed(err.message));
          }
          /* only really used to help with debugging */
          next(signalrError(label, err.message));
        }
        break;
      default:
        break;
    }
  };
}());
