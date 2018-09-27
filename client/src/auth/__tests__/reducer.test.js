import authReducer, { initialState } from 'auth/reducer';
import * as actions from 'auth/actions';

describe('Authentication Reducer', () => {
  it('should have correct initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('authenticating should return correct state', () => {
    const newState = authReducer(undefined, actions.authenticating());
    expect(newState).toEqual({
      authenticated: false,
      authenticating: true,
      errorMessage: '',
      user: null,
    });
  });

  it('loginSuccess should return correct state', () => {
    const newState = authReducer(
      undefined,
      actions.loginSuccess({ userName: 'joe', accessToken: 'blahblah' }),
    );
    expect(newState).toEqual({
      authenticated: true,
      authenticating: false,
      errorMessage: '',
      user: {
        userName: 'joe',
        accessToken: 'blahblah',
      },
    });
  });

  it('clearError should return correct state', () => {
    const state = {
      authenticated: false,
      authenticating: false,
      errorMessage: 'some error',
      user: null,
    };

    const newState = authReducer(state, actions.clearError());

    expect(newState).toEqual({
      authenticated: false,
      authenticating: false,
      errorMessage: '',
      user: null,
    });
  });

  it('loginFailed should return correct state', () => {
    const newState = authReducer(undefined, actions.loginFailed('some error'));
    expect(newState).toEqual({
      authenticated: false,
      authenticating: false,
      errorMessage: 'some error',
      user: null,
    });
  });

  it('logout should return initialState', () => {
    const state = {
      authenticated: true,
      user: { userName: 'some user' },
    };
    const newState = authReducer(state, actions.logout());
    expect(newState).toEqual(initialState);
  });

  it('tokenRenewFailed should return initialState', () => {
    const state = {
      authenticated: true,
      user: { userName: 'some user' },
    };
    const newState = authReducer(state, actions.tokenRenewFailed('some error'));
    expect(newState).toEqual(initialState);
  });

  it('tokenRenewSuccess should return correct state', () => {
    const state = {
      authenticated: true,
      user: {
        userName: 'joe',
        accessToken: 'blahblah',
        refreshToken: 'refresh-token',
      },
    };
    const newState = authReducer(
      state,
      actions.tokenRenewSuccess({
        userName: 'joe',
        accessToken: 'new-access-token',
        refreshToken: 'refresh-token',
      }),
    );

    expect(newState).toEqual({
      authenticated: true,
      authenticating: false,
      errorMessage: '',
      user: {
        userName: 'joe',
        accessToken: 'new-access-token',
        refreshToken: 'refresh-token',
      },
    });
  });
});
