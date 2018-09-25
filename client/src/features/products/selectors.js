import * as R from 'ramda';
import { selectLocations } from 'features/locations/selectors';
import { createSelector } from 'reselect';
import denormalize from 'utils/denormalize';

const getIdFromPath = (state, props) => Number(props.match.params.id);

export const selectProducts = R.prop('products');

export default {
  getAll: createSelector(
    [selectProducts, selectLocations],
    (products, locations) => {
      const productsWithLocationMoniker = denormalize(products, locations, {
        transformFn: (product, locs) => ({
          ...product,
          location: R.pathOr('', [product.locationId, 'moniker'], locs),
        }),
        key: 'locationId',
        mapTo: 'location',
      });
      return R.values(productsWithLocationMoniker);
    },
  ),
  getByIdFromPath: createSelector(
    [selectProducts, getIdFromPath],
    (products, id) => R.prop(id, products),
  ),
  getById: id => state => R.path(['products', id], state),
};
