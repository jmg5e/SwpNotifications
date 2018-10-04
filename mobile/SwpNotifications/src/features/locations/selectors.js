import * as R from 'ramda';
// import { selectLocations } from 'selectors/locations';
import { createSelector } from 'reselect';
// import denormalize from 'utils/denormalize';

const getIdFromPath = (state, props) => R.path(['navigation', 'state', 'params', 'locationId'], props);
// return R.path(['naviagtion', 'state', 'params', 'locationId'], props)
// console.log(props);
// console.log(state.navigation);
// return 0;
// return Number(props.navigation.params.locationId);


export const selectLocations = R.prop('locations');

export default {
  getLocations: createSelector([selectLocations], locations => locations),
  getLocationById: createSelector(
    [selectLocations, getIdFromPath],
    (locations, id) => locations.find(loc => loc.id === id)
    ,
  ),
  // getLocationProducts: createSelector(
  //   [selectLocations, getIdFromPath],
  //   (locations, id) => locations.find(loc => loc.id === id).products
  //   ,
  // ),
};
