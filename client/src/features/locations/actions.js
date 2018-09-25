import Types from './types';

export const getLocationsSuccess = locations => ({
  type: Types.GET_LOCATIONS_SUCCESS,
  locations,
});

export const createLocationSuccess = location => ({
  type: Types.CREATE_LOCATION_SUCCESS,
  location,
});

export const deleteLocationSuccess = id => ({
  type: Types.DELETE_LOCATION_SUCCESS,
  id,
});

export const updateLocationSuccess = location => ({
  type: Types.UPDATE_LOCATION_SUCCESS,
  location,
});
