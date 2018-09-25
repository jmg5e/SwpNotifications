import * as R from 'ramda';
import { createSelector } from 'reselect';
import denormalize from 'utils/denormalize';
import { selectProducts } from 'features/products/selectors';
import { selectLocations } from 'features/locations/selectors';

export const selectActiveRequests = R.path(['requests', 'active']);
export const selectRequestHistory = R.path(['requests', 'history']);

const allClients = R.path(['clients']);

export default {
  getActive: createSelector(
    [selectActiveRequests, selectProducts, selectLocations],
    (activeRequests, products, locations) => {
      const productsWithLocations = denormalize(products, locations, {
        key: 'locationId',
        mapTo: 'location',
      });
      const requestsWithProductsWithLocations = denormalize(
        activeRequests,
        productsWithLocations,
        {
          key: 'productId',
          mapTo: 'product',
        },
      );
      return R.values(requestsWithProductsWithLocations);
    },
  ),
  getHistory: createSelector(
    [selectRequestHistory, selectProducts, allClients],
    (requestHistory, allProducts, clients) => {
      const dismissalHistoryWithClient = denormalize(requestHistory, clients, {
        key: 'clientId',
        mapTo: 'client',
      });
      const dismissalEventWithProductArray = denormalize(dismissalHistoryWithClient, allProducts, {
        transformFn: (event, products) => ({
          ...event,
          products: event.requests.map(e => R.propOr({}, e.productId, products)),
        }),
      });
      return R.values(dismissalEventWithProductArray);
    },
  ),
};
