import settingsReducer, { initialState as SettingsState } from 'features/settings/reducer';
import Types from 'features/settings/types';

describe('Settings Reducer', () => {
  it('should have correct initial state', () => {
    expect(settingsReducer(undefined, {})).toEqual(SettingsState);
  });

  it('SETTINGS_UPDATED should have correct state', () => {
    expect(settingsReducer(undefined, {
      type: Types.SETTINGS_UPDATED,
      settings: { server: 'http://192.162.1' },
    })).toEqual({ server: 'http://192.162.1' });
  });

  it('SETTINGS_UPDATED with a single property should have correct state', () => {
    const state = {
      server: 'blah',
    };
    expect(settingsReducer(state, {
      type: Types.SETTINGS_UPDATED,
      settings: { server: 'http://192.162.1' },
    })).toEqual({ server: 'http://192.162.1' });
  });

  it('SETTINGS_RESET should have correct state', () => {
    const state = {
      server: 'http://192.162.1',
    };
    expect(settingsReducer(state, { type: Types.SETTINGS_RESET })).toEqual(SettingsState);
  });
});
