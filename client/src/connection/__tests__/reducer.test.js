// import Types from 'features/connection/types';
import connectionReducer, { initialState } from 'connection/reducer';
import * as actions from 'connection/actions';

describe('Connection Reducer', () => {
  it('should have correct initial state', () => {
    expect(connectionReducer(undefined, {})).toEqual(initialState);
  });

  it('connecting should return correct state', () => {
    expect(connectionReducer(undefined, actions.connecting())).toEqual({
      ...initialState,
      connecting: true,
    });
  });

  it('connectionSuccess should return correct state', () => {
    expect(
      connectionReducer(
        undefined,
        actions.connectionSuccess({ id: '123', identifier: 'joe' }),
      ),
    ).toEqual({
      connected: true,
      connecting: false,
      client: { id: '123', identifier: 'joe' },
      errorMessage: '',
    });
  });

  it('connectionFailed should return correct state with given error message', () => {
    expect(
      connectionReducer(
        undefined,
        actions.connectionFailed('something went wrong'),
      ),
    ).toEqual({
      ...initialState,
      errorMessage: 'something went wrong',
    });
  });

  it('connectionFailed should return correct state with default error message', () => {
    expect(connectionReducer(undefined, actions.connectionFailed())).toEqual({
      ...initialState,
      errorMessage: 'Connection Failed.',
    });
  });

  it('disconnected should return correct state', () => {
    expect(
      connectionReducer(
        {
          connected: true,
          client: { id: '123', identifier: 'joe' },
        },
        actions.connectionClosed(),
      ),
    ).toEqual(initialState);
  });
});
