/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';
import { navMiddleware } from '../navigation/AppNavigator';
import signalrMiddleware from '../signalR/middleware';
import pushNotificationMiddleware from '../notifications/middleware';
import apiMiddleware from '../api/middleware';
import appReducers from './appReducer';

const persistConfig = {
  key: 'root', // better name?
  timeout: 5000,
  storage: AsyncStorage,
  debug: true,
  whitelist: ['settings', 'locations', 'inventory'],
  // whitelist: ['settings', 'inventory'],
  // transforms: [authTransform],
};

const configureStore = () => {
  const reducers = persistCombineReducers(persistConfig, appReducers);
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const logger = createLogger({
    predicate: (getState, { type }) => !type.includes('@@redux-form')
      && !type.includes('persist')
      && !type.includes('Navigation'),
    collapsed: true,
  });

  const middleware = [
    logger,
    navMiddleware,
    signalrMiddleware,
    apiMiddleware,
    pushNotificationMiddleware,
  ];
  const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(...middleware)),
  );

  const persistor = persistStore(store);
  return { persistor, store };
};
export default configureStore;

export const store = configureStore();
