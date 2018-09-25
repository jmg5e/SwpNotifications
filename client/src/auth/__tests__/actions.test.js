import * as actions from 'auth/actions';
import Types from 'auth/types';

describe('Auth Actions', () => {
  it('loginSuccess', () => {
    const user = { userName: 'joe', accessToken: 'blahblah' };
    expect(actions.loginSuccess(user)).toEqual(
      expect.objectContaining({ type: Types.LOGIN_SUCCESS }),
    );
  });

  it('loginFailed', () => {
    expect(actions.loginFailed('invalid password')).toEqual(
      expect.objectContaining({ type: Types.LOGIN_FAILED }),
    );
  });

  it('logout', () => {
    expect(actions.logout()).toEqual(
      expect.objectContaining({ type: Types.LOGOUT }),
    );
  });
});
