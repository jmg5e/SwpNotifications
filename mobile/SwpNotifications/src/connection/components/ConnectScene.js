import React from 'react';
import {
  View, ActivityIndicator, TouchableOpacity, Text,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import ConnectForm from './ConnectForm';

type Props = {
  connectToHub: Function,
  errorMessage: string,
  connecting: boolean,
  goToSettings: Function,
};

const ConnectScene = (props: Props) => (
  <View style={{ flex: 1 }}>
    <Header
      centerComponent={{ text: 'SwpNotifications', style: { color: '#fff' } }}
      rightComponent={(
        <TouchableOpacity onPress={props.goToSettings}>
          <Icon name="settings" color="#fff" />
        </TouchableOpacity>
)}
    />
    <Text style={{ textAlign: 'center', fontSize: 20, paddingVertical: 20 }}> Disconnected </Text>
    {props.connecting && <ActivityIndicator animating />}
    <ConnectForm connectToHub={props.connectToHub} />
    <Text style={{ color: 'red', textAlign: 'center', paddingVertical: 30 }}>
      {props.errorMessage}
    </Text>
  </View>
);

export default ConnectScene;
