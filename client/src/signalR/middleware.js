import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { validateSignalrAction } from 'utils/validateActions';
import * as connectionActions from 'connection/actions';
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
        try {
          if (hub !== null) {
            await hub.stop();
          }
          const { server } = getState().settings;

          dispatch(connectionActions.connecting());
          const queryIdentifier = action.clientIdentifier ? `?clientIdentifier=${action.clientIdentifier}` : '';
          hub = new HubConnectionBuilder()
            .withUrl(`${server}/SwpHub${queryIdentifier}`, {
              accessTokenFactory: () => getAccessToken(store),
            })
            .configureLogging(LogLevel.Information)
            .build();

          eventHandler(hub, store);
          await hub.start();

          const connectedClient = await hub.invoke('GetCurrentClient');
          dispatch(connectionActions.connectionSuccess(connectedClient));
        } catch (err) {
          dispatch(connectionActions.connectionFailed(err.message));
        }
        break;
      case AuthTypes.LOGOUT:
      case Types.SIGNALR_DISCONNECT:
        if (hub !== null) {
          hub.stop();
        }
        break;
      case Types.SIGNALR:
        try {
          validateSignalrAction(action);
          const { method, success, args = [] } = action;

          const result = await hub.invoke(method, ...args);

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
