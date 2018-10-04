import { normalize } from 'normalizr';
import Types from './types';
import * as schemas from './schema';

export const getInventorySuccess = inventory => ({
  type: Types.GET_INVENTORY_SUCCESS,
  payload: normalize(inventory, schemas.ArrayOfLocations),
});

export const getInventoryFailed = errorMessage => ({
  type: Types.GET_INVENTORY_FAILED,
  errorMessage,
});

export const filterProducts = searchValue => ({
  type: Types.INVENTORY_FILTER_PRODUCTS,
  searchValue,
});

export const clearProductsFilter = () => ({
  type: Types.INVENTORY_FILTER_PRODUCTS,
  searchValue: null,
});
