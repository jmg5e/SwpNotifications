import * as R from 'ramda';
import { createSelector } from 'reselect';

/* eslint-disable */
/* TODO dirty solution
  getLocationId from state is a mess but props are not consisently set using withNavigation in headers
*/
// export const getLocationIdFromPath = (state, props) => R.path(['navigation', 'state', 'params', 'locationId'], props);
/* eslint-enable */
export const getLocationIdFromPath = (state, props) => {
  const idFromState = R.pipe(
    R.path(['navigation', 'routes']),
    R.nth(0),
    R.path(['routes']),
    R.nth(1),
    R.path(['params', 'locationId']),
  )(state);
  // const idFromState = -1;
  return R.pathOr(idFromState, ['navigation', 'state', 'params', 'locationId'], props);
};

export const selectProducts = R.path(['inventory', 'entities', 'products']);
export const selectLocations = R.path(['inventory', 'entities', 'locations']);
export const selectProductsSearchValue = R.path([
  'inventory',
  'products',
  'searchValue',
]);

const hasLocationId = locId => p => p.locationId === locId;

const containsSearchValue = searchValue => product => (typeof searchValue === 'string' && searchValue.length > 0
  ? RegExp(searchValue, 'gi').test(product.name)
  : true);
// return true;

export default {
  getLocations: createSelector([selectLocations], locations => R.values(locations)),
  getCurrentLocation: createSelector(
    [selectLocations, getLocationIdFromPath],
    (locations, locationId) => R.prop(locationId, locations),
  ),
  getLocationProducts: createSelector(
    [selectProducts, getLocationIdFromPath, selectProductsSearchValue],
    (products, locationId, searchValue) => {
      const filteredProducts = R.pipe(
        R.values,
        R.filter(hasLocationId(locationId)),
        R.filter(containsSearchValue(searchValue)),
      )(products);
      return filteredProducts;
    },
  ),
  getProductsSearchValue: createSelector(
    [selectProductsSearchValue],
    searchValue => searchValue,
  ),
};
