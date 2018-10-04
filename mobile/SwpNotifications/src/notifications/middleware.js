import PushNotification from 'react-native-push-notification';
import Types from '../features/messages/types';

const pushNotificationMiddleware = () => next => (action) => {
  const handlers = {
    [Types.MESSAGE_RECIEVED]: () => {
      const { from, text } = action.message;

      PushNotification.localNotification({
        color: 'green',
        vibrate: true,
        vibration: 300,
        title: `New Message from ${from}`,
        message: text,
        playSound: true,
        soundName: 'default',
      });
    },
  };

  if (typeof handlers[action.type] === 'function') handlers[action.type]();

  next(action);
};

export default pushNotificationMiddleware;
