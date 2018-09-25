import { handleErrors, transformResponse, requestWithAuth } from 'api/helpers';
import Types from 'api/types';

describe('api helper functions', () => {
  describe('handleErrors', () => {
    it('should return response if OK', async () => {
      const response = {
        ok: true,
        status: 200,
        text: () => Promise.resolve(),
        statusText: 'all good',
      };
      await expect(handleErrors(response)).resolves.toEqual(response);
    });

    it('should throw text body if available', async () => {
      const response = {
        ok: false,
        status: 500,
        text: () => Promise.resolve('something went wrong'),
        statusText: 'not needed',
      };

      await expect(handleErrors(response)).rejects.toEqual(
        Error('something went wrong'),
      );
    });
    it('should throw statusText', async () => {
      const response = {
        ok: false,
        status: 500,
        text: () => Promise.resolve(),
        statusText: 'BadRequest',
      };

      await expect(handleErrors(response)).rejects.toEqual(
        Error('BadRequest'),
      );
    });
  });

  describe('requestWithAuth', () => {
    it('should return new action with correct requestOption headers', () => {
      const action = {
        type: Types.API_AUTHENTICATED,
        endPoint: '/protected',
        requestOptions: {
          method: 'GET',
        },
      };
      const newAction = requestWithAuth(action, 'accessToken');
      expect(newAction).toEqual({
        type: Types.API,
        endPoint: '/protected',
        requestOptions: {
          method: 'GET',
          headers: { Authorization: 'Bearer accessToken' },
        },
      });
    });

    it('should return action with request options if action has no requestOptions', () => {
      const action = {
        type: Types.API_AUTHENTICATED,
        endPoint: '/protected',
      };
      const newAction = requestWithAuth(action, 'accessToken');
      expect(newAction).toEqual({
        type: Types.API,
        endPoint: '/protected',
        requestOptions: {
          headers: { Authorization: 'Bearer accessToken' },
        },
      });
    });

    it('should not overwrite previous action request headers', () => {
      const action = {
        type: 'API_AUTHENTICATED',
        endPoint: '/protected',
        requestOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
      };
      const newAction = requestWithAuth(action, 'accessToken');
      expect(newAction).toEqual({
        type: Types.API,
        endPoint: '/protected',
        requestOptions: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer accessToken',
          },
        },
      });
    });
  });

  describe('transformResponse', () => {
    it('should return response as json', async () => {
      const response = {
        headers: {
          get: jest.fn(() => 'application/json'),
        },
        json: () => Promise.resolve('JSON!'),
        text: () => Promise.resolve('TEXT!'),
      };
      const result = await transformResponse(response);
      expect(response.headers.get).toBeCalledWith('content-type');
      expect(result).toEqual('JSON!');
    });

    it('should default to returning response as text', async () => {
      const response = {
        headers: {
          get: jest.fn(() => ''),
        },
        json: () => Promise.resolve('JSON!'),
        text: () => Promise.resolve('TEXT!'),
      };
      const result = await transformResponse(response);
      expect(response.headers.get).toBeCalledWith('content-type');
      expect(result).toEqual('TEXT!');
    });
  });
});
