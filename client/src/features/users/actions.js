import Types from './types';

export const getUsersSuccess = users => ({
  type: Types.GET_USERS_SUCCESS,
  users,
});

export const createUserSuccess = user => ({
  type: Types.CREATE_USER_SUCCESS,
  user,
});

export const deleteUserSuccess = id => ({
  type: Types.DELETE_USER_SUCCESS,
  id,
});

export const updateUserSuccess = user => ({
  type: Types.UPDATE_USER_SUCCESS,
  user,
});
