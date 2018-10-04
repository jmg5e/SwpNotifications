// import { normalize } from 'normalizr';
import Types from './types';
// import * as schemas from './schema';

export const getLocationsSuccess = locations => ({
  type: Types.GET_LOCATIONS_SUCCESS,
  locations,
});

export const getLocationsFailed = errorMessage => ({
  type: Types.GET_LOCATIONS_FAILED,
  errorMessage,
});
