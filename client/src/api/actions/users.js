import Types from 'api/types';
import * as actions from 'features/users/actions';
import { toastrError } from 'notifications/toastr';

export const getUsers = () => ({
  type: Types.API_AUTHENTICATED,
  label: 'GET users',
  endPoint: '/api/users',
  success: actions.getUsersSuccess,
  failed: toastrError('Failed to get users.'),
  requestOptions: {
    method: 'GET',
  },
});

export const createUser = user => ({
  type: Types.API_AUTHENTICATED,
  label: 'Post api/users',
  endPoint: '/api/users',
  success: actions.createUserSuccess,
  failed: toastrError('Create User Failed.'),
  requestOptions: {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  },
});

export const deleteUser = user => ({
  type: Types.API_AUTHENTICATED,
  label: 'Delete api/users',
  endPoint: `/api/users/${user.id}`,
  success: () => actions.deleteUserSuccess(user.id),
  failed: toastrError('Delete User Failed.'),
  requestOptions: {
    method: 'DELETE',
  },
});

export const updateUser = user => ({
  type: Types.API_AUTHENTICATED,
  label: 'Update User',
  endPoint: `/api/users/${user.id}`,
  success: () => actions.updateUserSuccess(user),
  failed: toastrError('Update User Failed.'),
  requestOptions: {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  },
});
