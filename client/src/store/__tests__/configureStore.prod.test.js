import { createStore, applyMiddleware, compose } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import apiMiddleware from 'api/middleware';
import signalrMiddleware from 'signalR/middleware';
import configureStore from 'store/configureStore.prod';

jest.mock('redux', () => ({
  createStore: jest.fn(() => 'STORE'),
  applyMiddleware: jest.fn(),
  compose: jest.fn(),
}));
jest.mock('redux-persist', () => ({
  createTransform: jest.fn(),
  persistStore: jest.fn(() => 'PERSITOR'),
  persistCombineReducers: jest.fn(),
}));

jest.mock('redux-persist/es/storage', () => jest.fn());

/* dumb tests? */
describe('configure redux store : production', () => {
  it('calls everything and returns persistor and store', () => {
    const { store, persistor } = configureStore();
    expect(createStore).toBeCalled();
    expect(store).toEqual('STORE');
    expect(persistStore).toBeCalledWith('STORE');
    expect(applyMiddleware).toBeCalled();
    expect(compose).toBeCalled();
    expect(persistor).toEqual('PERSITOR');
  });

  it('includes all correct reducers', () => {
    configureStore();
    const persistConfig = persistCombineReducers.mock.calls[0][0];
    expect(persistConfig).toEqual(expect.any(Object));
    const appReducer = persistCombineReducers.mock.calls[0][1];
    expect(Object.keys(appReducer)).toEqual(expect.arrayContaining([
      'auth',
      'connection',
      'form',
      'locations',
      'products',
      'requests',
      'router',
      'settings',
    ]));
  });

  it('applys correct middleware - production', () => {
    configureStore();
    const middlewares = applyMiddleware.mock.calls[0];
    expect(middlewares.length).toEqual(5);
    // array of functions
    expect(middlewares).toEqual(expect.arrayContaining([
      apiMiddleware,
      signalrMiddleware,
    ]));
  });
});
