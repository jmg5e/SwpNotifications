import Types from './types';
// import * as R from 'ramda';

export const initialState = [
];

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LOCATIONS_SUCCESS:
      return action.locations;
      // return R.indexBy(R.prop('id'), action.locations);
    default:
      return state;
  }
};

export default locationsReducer;
