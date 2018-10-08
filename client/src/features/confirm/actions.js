import Types from './types';

export const confirm = (confirmFn, message = 'Are You Sure?') => ({
  type: Types.OPEN_CONFIRM,
  confirmFn,
  message,
});

export const closeConfirm = () => ({
  type: Types.CLOSE_CONFIRM,
});
