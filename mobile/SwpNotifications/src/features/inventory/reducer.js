import * as R from 'ramda';
import Types from './types';

export const initialState = {
  entities: {
    locations: {},
    products: {},
    result: [],
  },
  products: {
    searchValue: null,
  },
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_INVENTORY_SUCCESS:
      return action.payload;
      // return R.indexBy(R.prop('id'), action.locations);
    case Types.INVENTORY_FILTER_PRODUCTS:
      return R.assocPath(['products', 'searchValue'], action.searchValue, state);
    default:
      return state;
  }
};

export default inventoryReducer;
