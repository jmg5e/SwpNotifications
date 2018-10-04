import React from 'react';
// import { View, Text } from 'react-native';
import {
  View, ActivityIndicator,
} from 'react-native';

const SplashScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <ActivityIndicator size={50} animating />
  </View>
);

export default SplashScreen;
