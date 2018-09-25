import authTransform from 'store/persistAuthTransform';

describe('redux persist auth transform', () => {
  it('inbound auth state should include only user', () => {
    const state = {
      authenticated: true,
      authenticating: false,
      errorMessage: 'some error',
      user: {
        accessToken: 'blahblah',
      },
    };

    const inboundState = authTransform.in(state, 'auth');
    expect(inboundState).toEqual({
      user: { accessToken: 'blahblah' },
    });
  });

  it('outbound auth state should return authenticated state if accessToken valid', () => {
    const state = {
      user: {
        accessToken: 'blahblah',
      },
    };

    const outboundState = authTransform.out(state, 'auth');
    expect(outboundState).toEqual({
      authenticated: true,
      authenticating: false,
      errorMessage: '',
      user: { accessToken: 'blahblah' },
    });
  });

  it('outbound auth state should return default unauthenticated state if accessToken inValid', () => {
    const state = {
      auth: {
        user: null,
      },
    };

    const outboundState = authTransform.out(state, 'auth');
    expect(outboundState).toEqual({
      authenticated: false,
      authenticating: false,
      errorMessage: '',
      user: null,
    });
  });
});
