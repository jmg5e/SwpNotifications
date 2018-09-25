import Types from 'api/types';
import * as actions from 'features/locations/actions';
import { toastrError } from 'notifications/toastr';

export const getLocations = () => ({
  type: Types.API,
  label: 'Get Locations',
  endPoint: '/api/locations',
  success: actions.getLocationsSuccess,
  requestOptions: {
    method: 'GET',
  },
});

export const createLocation = location => ({
  type: Types.API_AUTHENTICATED,
  label: 'Create Locations',
  endPoint: '/api/locations',
  success: actions.createLocationSuccess,
  failed: toastrError('Create Location Failed.'),
  requestOptions: {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(location),
  },
});

export const deleteLocation = ({ id }) => ({
  type: Types.API_AUTHENTICATED,
  label: `Delete Location: ${id}`,
  endPoint: `/api/locations/${id}`,
  success: () => actions.deleteLocationSuccess(id),
  failed: toastrError(`Delete Location: ${id} Failed.`),
  requestOptions: {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  },
});

export const updateLocation = location => ({
  type: Types.API_AUTHENTICATED,
  label: `Update Location ${location.id}`,
  endPoint: `/api/locations/${location.id}`,
  success: () => actions.updateLocationSuccess(location),
  failed: toastrError(`Update Location: ${location.id} Failed.`),
  requestOptions: {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(location),
  },
});
