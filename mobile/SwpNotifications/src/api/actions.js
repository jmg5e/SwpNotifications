import Types from './types';
import { getLocationsSuccess, getLocationsFailed } from '../features/locations/actions';
import { getInventorySuccess, getInventoryFailed } from '../features/inventory/actions';

export const getInventory = () => ({
  type: Types.API,
  label: 'Get Inventory',
  endPoint: '/api/locations?includeProducts=true',
  success: getInventorySuccess,
  failed: getInventoryFailed,
  requestOptions: {
    method: 'GET',
  },
});

export const getLocations = () => ({
  type: Types.API,
  label: 'Get Inventory',
  endPoint: '/api/locations?includeProducts=true',
  success: getLocationsSuccess,
  failed: getLocationsFailed,
  requestOptions: {
    method: 'GET',
  },
});

export const requestProduct = productId => ({
  type: Types.API,
  label: 'Post api/requests',
  endPoint: '/api/requests',
  // failed: toastrError('Product Request Failed.'),
  requestOptions: {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productId),
  },
});
