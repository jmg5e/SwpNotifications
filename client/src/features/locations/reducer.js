import * as R from 'ramda';
import Types from './types';

export const initialState = {};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LOCATIONS_SUCCESS:
      return R.indexBy(R.prop('id'), action.locations);
    case Types.CREATE_LOCATION_SUCCESS:
      return R.assoc(action.location.id, action.location, state);
    case Types.DELETE_LOCATION_SUCCESS:
      return R.dissoc(action.id, state);
    // return R.omit([action.id], state);
    case Types.UPDATE_LOCATION_SUCCESS:
      return R.assocPath([action.location.id], action.location, state);
    default:
      return state;
  }
};

export default locationsReducer;
