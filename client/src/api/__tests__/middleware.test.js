import configureMockStore from 'redux-mock-store';
import Types from 'api/types';
import apiMiddleware from 'api/middleware';
import {
  startNetwork, endNetwork, apiError, authError,
} from 'api/actions';
import getAccessToken from 'api/getAccessToken';

jest.mock('api/getAccessToken');

const middlewares = [apiMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Api Middleware', () => {
  afterEach(() => {
    global.fetch.mockClear();
  });
  describe('Api Request', () => {
    it('should call fetch with correct parameters', async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        headers: { get: () => 'application/json' },
        ok: true,
        text: () => Promise.resolve('something went wrong'),
        json: () => ({ data: 'some data' }),
      }));

      const action = {
        type: Types.API,
        label: 'test api',
        endPoint: '/api/test',
        requestOptions: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
        success: jest.fn(result => ({ type: 'SUCCESS', ...result })),
      };

      const store = mockStore({ settings: { server: 'http://server:3000' } });
      await store.dispatch(action);
      expect(global.fetch).toBeCalledWith('http://server:3000/api/test', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      });
    });

    it('should NOT call fetch on incorrect action', async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        text: () => Promise.resolve('something went wrong'),
        json: () => ({ data: 'some data' }),
      }));

      const action = {
        type: Types.API,
        label: 'test api',
        endPoint: null,
        requestOptions: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
        success: jest.fn(response => ({
          type: 'GET_DATA_SUCCESS',
          ...response,
        })),
      };

      const store = mockStore({ settings: { server: 'http://server:3000' } });
      await store.dispatch(action);
      expect(store.getActions()).toEqual([
        apiError('test api', 'api invalid action: action.endPoint'),
      ]);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should disptch success action with fetched data', async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        text: () => Promise.resolve('something went wrong'),
        json: () => ({ data: 'some data' }),
      }));
      const store = mockStore({ settings: { server: '' } });

      const action = {
        type: Types.API,
        label: 'test api',
        endPoint: 'api/test',
        success: jest.fn(result => ({ type: 'SUCCESS', ...result })),
      };

      await store.dispatch(action);

      const expectedActions = [
        startNetwork('test api'),
        endNetwork('test api'),
        { type: 'SUCCESS', data: 'some data' },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should disptch error with correct message', async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: false,
        headers: { get: () => 'text/plain' },
        text: () => Promise.resolve('something went wrong'),
        json: () => ({ data: 'some data' }),
      }));

      const action = {
        type: Types.API,
        label: 'test api',
        endPoint: 'api/test',
        success: jest.fn(response => ({ type: 'GET_DATA_SUCCESS', response })),
      };

      const store = mockStore({ settings: { server: '' } });
      await store.dispatch(action);

      const expectedActions = [
        startNetwork('test api'),
        apiError('test api', 'something went wrong'),
        endNetwork('test api'),
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should disptch custom failed action', async () => {
      const errorMessage = 'sOmething went wrong';
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: false,
        headers: { get: () => 'text/plain' },
        text: () => Promise.resolve(errorMessage),
        json: () => Promise.resolve({ data: 'some data' }),
      }));

      const customFailedAction = jest.fn(err => ({
        type: 'CUSTOM_ERROR',
        test: true,
        errorMessage: err,
      }));
      const action = {
        type: Types.API,
        label: 'test api',
        endPoint: 'api/test',
        success: jest.fn(response => ({ type: 'GET_DATA_SUCCESS', response })),
        failed: customFailedAction,
      };

      const store = mockStore({ settings: { server: '' } });
      await store.dispatch(action);

      expect(action.failed).toBeCalled();
      const expectedActions = [
        startNetwork('test api'),
        customFailedAction(errorMessage),
        apiError('test api', errorMessage),
        endNetwork('test api'),
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('Authenticated Request', () => {
    it('should call getAccessToken with store', async () => {
      // global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      //   ok: false,
      //   headers: { get: () => 'text/plain' },
      //   json: () => Promise.resolve({ data: 'some data' }),
      // }));
      //
      // getAccessToken.mockImplementationOnce(() => Promise.resolve('accessToken'));
      const action = {
        type: Types.API_AUTHENTICATED,
        label: 'test api',
        endPoint: 'api/test',
      };

      const store = mockStore({
        settings: { server: '', auth: { user: { refreshToken: 'blah' } } },
      });

      await store.dispatch(action);
      expect(getAccessToken).toBeCalledWith(
        expect.objectContaining({
          dispatch: expect.any(Function),
          getState: expect.any(Function),
        }),
      );
    });

    it('should call fetch with correct authorization header when valid token is recieved', async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: false,
        headers: { get: () => 'text/plain' },
        json: () => Promise.resolve({ data: 'some data' }),
      }));

      getAccessToken.mockImplementation(() => Promise.resolve('accessToken'));

      const action = {
        type: Types.API_AUTHENTICATED,
        label: 'test api',
        endPoint: 'api/test',
        success: () => ({ type: 'SUCCESS' }),
      };

      const store = mockStore({
        settings: { server: '', auth: { user: {} } },
      });

      await store.dispatch(action);

      expect(global.fetch).toBeCalledWith('api/test', {
        headers: { Authorization: 'Bearer accessToken' },
      });
    });

    it('should call auth error if valid token could not be found', async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: false,
        headers: { get: () => 'text/plain' },
        json: () => Promise.resolve({ data: 'some data' }),
      }));

      getAccessToken.mockImplementationOnce(() => Promise.resolve(null));
      const action = {
        type: Types.API_AUTHENTICATED,
        label: 'test api',
        endPoint: 'api/test',
      };

      const store = mockStore({
        settings: { server: '' },
      });

      await store.dispatch(action);
      expect(store.getActions()).toEqual([authError('test api')]);

      expect(global.fetch).not.toBeCalled();
    });
  });
});
