import Types from './types';

export const updateSettings = settings => ({
  type: Types.SETTINGS_UPDATED,
  settings,
});

export const resetSettings = () => ({
  type: Types.SETTINGS_RESET,
});
