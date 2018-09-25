import * as R from 'ramda';
import Types from './types';

export const initialState = {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS:
      return R.indexBy(R.prop('id'), action.users);
    case Types.DELETE_USER_SUCCESS:
      return R.omit([action.id], state);
    case Types.CREATE_USER_SUCCESS:
      return {
        ...state,
        [action.user.id]: action.user,
      };
    case Types.UPDATE_USER_SUCCESS:
      return R.mergeDeepRight(state,
        {
          [action.user.id]: R.omit(['password', 'passwordVerify'], action.user),
        });
    default:
      return state;
  }
};

export default usersReducer;
