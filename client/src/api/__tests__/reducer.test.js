import apiReducer from 'api/reducer';
// import { SettingsState } from 'reducers/initialState';
import Types from 'api/types';

describe('Loading Reducer', () => {
  it('should have correct initial state', () => {
    expect(apiReducer(undefined, {})).toEqual(false);
  });

  it('START_NETWORK should return correct state', () => {
    expect(apiReducer(undefined, {
      type: Types.START_NETWORK,
    })).toEqual(true);
  });

  it('END_NETWORK should have return correct state', () => {
    expect(apiReducer(undefined, {
      type: Types.END_NETWORK,
    })).toEqual(false);
  });
});
