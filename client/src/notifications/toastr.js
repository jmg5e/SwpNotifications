import { actions as toastrActions } from 'react-redux-toastr';

export const toastrError = (label, options = {}) => message => toastrActions.add({
  type: 'error',
  title: `${label}`,
  message,
  ...options,
});

export const toastrInfo = (label, options = {}) => message => toastrActions.add({
  type: 'info',
  title: `${label}`,
  message,
  ...options,
});

export const toastrSuccess = (label, options = {}) => message => toastrActions.add({
  type: 'success',
  title: `${label}`,
  message,
  ...options,
});
