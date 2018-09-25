import * as R from 'ramda';
import { createSelector } from 'reselect';

const getIdFromPath = (state, props) => props.match.params.id;

export const selectUsers = R.prop('users');

export default {
  getAll: createSelector([selectUsers], R.values),
  getById: createSelector(
    [selectUsers, getIdFromPath],
    (users, id) => R.prop(id, users),
  ),
};
