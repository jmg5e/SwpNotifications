import configureMockStore from 'redux-mock-store';
import signalrMiddleware from 'signalR/middleware';
import { signalrError, connectToHub, disconnect } from 'signalR/actions';
import * as connectionActions from 'connection/actions';
import eventHandler from 'signalR/eventHandler';
import {
  MockedHubConnection,
  MockedHubConnectionBuilder,
} from '@aspnet/signalr';

jest.mock('@aspnet/signalr');
jest.mock('signalR/eventHandler');

describe('SignalR Middleware', () => {
  const middlewares = [signalrMiddleware];
  const mockStore = configureMockStore(middlewares);
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call HubConnectionBuilder.withUrl with correct url', async () => {
    const store = mockStore({ settings: { server: '192.168.2.1:3000' } });
    await store.dispatch(connectToHub());
    expect(MockedHubConnectionBuilder.withUrl).toBeCalledWith(
      '192.168.2.1:3000/SwpHub',
      expect.any(Object),
    );
  });

  it('should call HubConnectionBuilder.withUrl with correct query parameter', async () => {
    const store = mockStore({ settings: { server: '192.168.2.1:3000' } });
    await store.dispatch(connectToHub('steve'));
    expect(MockedHubConnectionBuilder.withUrl).toBeCalledWith(
      '192.168.2.1:3000/SwpHub?clientIdentifier=steve',
      expect.any(Object),
    );
  });

  it('Hub connection success should dispaicall connectionSuccess & eventHandler', async () => {
    MockedHubConnection.start = jest.fn(() => Promise.resolve());
    MockedHubConnection.invoke = jest.fn();
    const store = mockStore({ settings: { server: '192.168.2.1:3000' } });
    await store.dispatch(connectToHub());
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        connectToHub(),
        connectionActions.connecting(),
        connectionActions.connectionSuccess(),
      ]),
    );

    expect(eventHandler).toBeCalledWith(
      MockedHubConnection,
      expect.any(Object),
    );
  });

  it('Hub connection failed should call connectionFailed', async () => {
    MockedHubConnection.start = jest.fn(() => Promise.reject(Error('something went wrong')));

    const store = mockStore({ settings: { server: '' } });
    await store.dispatch(connectToHub());
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        connectToHub(),
        connectionActions.connecting(),
        connectionActions.connectionFailed('something went wrong'),
      ]),
    );
  });

  it('disconnect should stop hub', async () => {
    const store = mockStore({ settings: { server: '192.168.2.1:3000' } });
    await store.dispatch(disconnect());
    expect(MockedHubConnection.stop).toBeCalled();
  });

  it('should invoke hub method with correct arguments', async () => {
    MockedHubConnection.invoke = jest.fn(() => Promise.resolve());
    const store = mockStore({ settings: { server: '192.168.2.1:3000' } });
    const testAction = {
      type: 'SIGNALR',
      label: 'test action',
      method: 'NewMessage',
      args: ['hello world'],
    };
    await store.dispatch(testAction);
    const expectedActions = [testAction];
    expect(MockedHubConnection.invoke).toBeCalledWith(
      'NewMessage',
      'hello world',
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('invoke method success should dispatch success action', async () => {
    MockedHubConnection.invoke = jest.fn(() => Promise.resolve());
    const store = mockStore({ settings: { server: '192.168.2.1:3000' } });
    const testAction = {
      type: 'SIGNALR',
      label: 'test action',
      method: 'NewMessage',
      success: jest.fn(() => ({
        type: 'new_message_success',
      })),
      args: ['hello world'],
    };
    await store.dispatch(testAction);
    const expectedActions = [testAction, testAction.success()];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('invoke method failure should dispatch failed action', async () => {
    MockedHubConnection.invoke = jest.fn(() => Promise.reject(Error('someThing went bad')));
    const store = mockStore({ settings: { server: '192.168.2.1:3000' } });
    const testAction = {
      type: 'SIGNALR',
      label: 'test action',
      method: 'NewMessage',
      args: ['hello world'],
      failed: jest.fn(() => ({ type: 'failed_new_message' })),
    };
    await store.dispatch(testAction);
    const expectedActions = [
      testAction,
      { type: 'failed_new_message' },
      signalrError(testAction.label, 'someThing went bad'),
    ];
    expect(testAction.failed).toBeCalledWith('someThing went bad');
    expect(store.getActions()).toEqual(expectedActions);
  });
});
