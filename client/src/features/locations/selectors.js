import * as R from 'ramda';
import { createSelector } from 'reselect';

const getIdFromPath = (state, props) => Number(props.match.params.id);

export const selectLocations = R.prop('locations');

export default {
  getAll: createSelector([selectLocations], R.values),
  getById: createSelector(
    [selectLocations, getIdFromPath],
    (locations, id) => R.prop(id, locations),
  ),
};
