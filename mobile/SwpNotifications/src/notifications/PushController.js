import { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onNotification(notification) {
        // eslint-disable-next-line
        console.log('NOTIFICATION: ', notification);
      },
      popInitialNotification: true,
    });
  }

  render() {
    return null;
  }
}
