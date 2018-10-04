/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import App from './App';
import SplashScreen from './components/SplashScreen';
import configureStore from './store/configureStore';

const { store, persistor } = configureStore();
export default () => (
  <Provider store={store}>
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
