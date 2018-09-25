import { createTransform } from 'redux-persist';
import { initialState } from 'auth/reducer';

// transform state on its way to being serialized and persisted.
const authInboundTransform = state => ({
  user: state.user,
});

// transform state being rehydrated
// TODO rethink this
const authOutboundTransform = (state) => {
  const { user } = state;
  if (user && user.accessToken) {
    return {
      authenticated: true,
      authenticating: false,
      errorMessage: '',
      user,
    };
  }
  return initialState;
};

export default createTransform(
  authInboundTransform,
  authOutboundTransform,
  // define which reducers this transform gets called for.
  { whitelist: ['auth'] },
);
