import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from '@aspnet/signalr';
// import { validateSignalrAction } from '../utils/validateActions';
import DeviceInfo from 'react-native-device-info';
import * as connectionActions from '../connection/actions';
import { signalrError } from './actions';
import Types from './types';
import eventHandler from './eventHandler';

export default (function signalrMiddleware() {
  let hub = null;

  return store => next => async (action) => {
    next(action);
    const { dispatch, getState } = store;
    switch (action.type) {
      case Types.SIGNALR_CONNECT:
        try {
          if (hub !== null) {
            await hub.stop();
          }
          const { server } = getState().settings;

          dispatch(connectionActions.connecting());

          const deviceModel = DeviceInfo.getModel();
          // console.log(deviceModel);
          const queryIdentifier = action.clientIdentifier
            ? `?clientIdentifier=${action.clientIdentifier}`
            : `?clientIdentifier=${deviceModel}`;
          // const queryIdentifier = `?clientIdentifier=${deviceModel}`;
          hub = new HubConnectionBuilder()
            .withUrl(`${server}/SwpHub${queryIdentifier}`, {
              // skipNegotiation: true,
              transport: HttpTransportType.WebSockets,
            })
            .configureLogging(LogLevel.None)
            .build();
          // hub.serverTimeoutInMilliseconds = 5000;
          // hub.connectionClosed( () => console.log('closed'));
          // hub.serverTimeout( () => console.log('timedout'));

          eventHandler(hub, store);
          await hub.start();

          // const connectionId = await hub.invoke('GetConnectionId');
          dispatch(connectionActions.connectionSuccess());
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
          // validateSignalrAction(action);
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
