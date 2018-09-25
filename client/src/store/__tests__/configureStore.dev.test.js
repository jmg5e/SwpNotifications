import { createStore, applyMiddleware, compose } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import apiMiddleware from 'api/middleware';
import signalrMiddleware from 'signalR/middleware';
import configureStore from 'store/configureStore.dev';

jest.mock('redux', () => ({
  createStore: jest.fn(() => 'MOCKED_STORE'),
  applyMiddleware: jest.fn(),
  compose: jest.fn(),
}));

jest.mock('redux-persist', () => ({
  createTransform: jest.fn(),
  persistStore: jest.fn(() => 'MOCKED_PERSISTOR'),
  persistCombineReducers: jest.fn(),
}));

jest.mock('redux-persist/es/storage', () => jest.fn());

/* dumb tests? */
describe('configure redux store : development', () => {
  it('calls everything and returns persistor and store', () => {
    const { store, persistor } = configureStore();
    expect(createStore).toBeCalled();
    expect(store).toEqual('MOCKED_STORE');
    expect(persistStore).toBeCalledWith('MOCKED_STORE');
    expect(applyMiddleware).toBeCalled();
    expect(compose).toBeCalled();
    expect(persistor).toEqual('MOCKED_PERSISTOR');
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

  it('applys correct middleware - development', () => {
    configureStore();
    const middlewares = applyMiddleware.mock.calls[0];
    expect(middlewares.length).toEqual(6);

    // array of functions
    expect(middlewares).toEqual(expect.arrayContaining([
      expect.any(Function),
      apiMiddleware,
      signalrMiddleware,
    ]));
  });
});
