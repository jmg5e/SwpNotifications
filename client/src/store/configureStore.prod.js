/* eslint 'import/no-extraneous-dependencies': 0 */
/* eslint-disable no-underscore-dangle */
import apiMiddleware from 'api/middleware';
import createHistory from 'history/createBrowserHistory';
import signalRMiddleware from 'signalR/middleware';
import redirectMiddleware from 'routes/middleware';
import storage from 'redux-persist/es/storage';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import authTransform from './persistAuthTransform';
import appReducers from './appReducers';

export const history = createHistory();

const persistConfig = {
  key: 'AppStorage',
  storage,
  debug: true,
  whitelist: ['auth', 'settings', 'products', 'locations'],
  transforms: [authTransform],
};

const configureStore = () => {
  const middleware = [
    routerMiddleware(history),
    apiMiddleware,
    signalRMiddleware,
    redirectMiddleware,
  ];

  const reducers = {
    ...appReducers,
    router: routerReducer,
    form: formReducer,
    toastr: toastrReducer,
  };

  const appReducer = persistCombineReducers(persistConfig, reducers);

  const store = createStore(
    appReducer,
    compose(applyMiddleware(...middleware)),
  );

  const persistor = persistStore(store);
  return { persistor, store };
};

export default configureStore;
