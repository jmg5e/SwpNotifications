import * as R from 'ramda';
import Types from './types';

const initialState = {};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_PRODUCTS_SUCCESS:
      return R.indexBy(R.prop('id'), action.products);
    case Types.CREATE_PRODUCT_SUCCESS:
      return R.assoc(action.product.id, action.product, state);
    case Types.DELETE_PRODUCT_SUCCESS:
      return R.dissoc(action.id, state);
      // return R.omit([action.id], state);
    case Types.UPDATE_PRODUCT_SUCCESS:
      return R.assocPath([action.product.id], action.product, state);
    default:
      return state;
  }
};

export default productsReducer;
