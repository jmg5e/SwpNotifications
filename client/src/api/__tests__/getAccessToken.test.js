import configureMockStore from 'redux-mock-store';
import getAccessToken from 'api/getAccessToken';
import { tokenIsExpired } from 'utils/jwt';
import { tokenRenewSuccess, tokenRenewFailed } from 'auth/actions';

jest.mock('utils/jwt', () => ({
  tokenIsExpired: jest.fn().mockReturnValue(false),
}));

const mockStore = configureMockStore();

describe('getAccessToken', () => {
  it('should return null if token is not in store', async () => {
    const store = mockStore({ auth: {} });
    const token = await getAccessToken(store);
    expect(token).toEqual(null);
    expect(tokenIsExpired).not.toBeCalled();
  });

  it('should return token from store if not expired', async () => {
    tokenIsExpired.mockImplementationOnce(() => false);
    const store = mockStore({
      auth: {
        user: { accessToken: 'accessToken', refreshToken: 'refreshTOken' },
      },
    });
    const token = await getAccessToken(store);
    expect(token).toEqual('accessToken');
    expect(tokenIsExpired).toBeCalledWith('accessToken');
  });

  it('if expired should handle token renew success', async () => {
    tokenIsExpired.mockImplementationOnce(() => true);
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      headers: { get: () => 'application/json' },
      ok: true,
      json: () => ({ accessToken: 'new token' }),
    }));
    const store = mockStore({
      settings: { server: 'http://server:3000' },
      auth: {
        user: { accessToken: 'expiredToken', refreshToken: 'refreshTOken' },
      },
    });

    const token = await getAccessToken(store);
    expect(store.getActions()).toEqual([
      tokenRenewSuccess({ accessToken: 'new token' }),
    ]);
    expect(token).toEqual('new token');
    expect(global.fetch).toBeCalledWith('http://server:3000/api/auth/renew', {
      body: '"refreshTOken"',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });

  it('if expired should handle token renew failure', async () => {
    tokenIsExpired.mockImplementationOnce(() => true);
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      ok: false,
      headers: { get: () => 'text/plain' },
      text: () => Promise.resolve('something went wrong'),
    }));

    const store = mockStore({
      settings: { server: 'http://server:3000' },
      auth: {
        user: { accessToken: 'expiredToken', refreshToken: 'refreshTOken' },
      },
    });
    const token = await getAccessToken(store);
    expect(store.getActions()).toEqual([
      tokenRenewFailed('something went wrong'),
    ]);
    expect(token).toEqual(null);
    expect(global.fetch).toBeCalledWith('http://server:3000/api/auth/renew', {
      body: '"refreshTOken"',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });
});
