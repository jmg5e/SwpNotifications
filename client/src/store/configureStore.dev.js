/* eslint 'import/no-extraneous-dependencies': 0 */
/* eslint-disable no-underscore-dangle */
import apiMiddleware from 'api/middleware';
import createHistory from 'history/createBrowserHistory';
import signalRMiddleware from 'signalR/middleware';
import redirectMiddleware from 'routes/middleware';
import notificationMiddleware from 'notifications/middleware';
import storage from 'redux-persist/es/storage';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import appReducers from './appReducers';
import authTransform from './persistAuthTransform';

export const history = createHistory();

const persistConfig = {
  key: 'AppStorage',
  storage,
  debug: true,
  whitelist: ['auth', 'settings', 'products', 'locations'],
  transforms: [authTransform],
};

const logger = createLogger({
  predicate: (getState, { type }) => !type.includes('@@redux-form')
    && !type.includes('persist')
    && !type.includes('@ReduxToastr')
    && !type.includes('@@router'),
  collapsed: true,
});

const configureStore = () => {
  const middleware = [
    logger,
    apiMiddleware,
    signalRMiddleware,
    redirectMiddleware,
    notificationMiddleware,
    routerMiddleware(history),
  ];

  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const reducers = {
    ...appReducers,
    router: routerReducer,
    form: formReducer,
    toastr: toastrReducer,
  };

  const appReducer = persistCombineReducers(persistConfig, reducers);

  const store = createStore(
    appReducer,
    composeEnhancer(applyMiddleware(...middleware)),
  );

  const persistor = persistStore(store);
  return { persistor, store };
};

export default configureStore;
