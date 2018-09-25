import Types from './types';

export const getProductsSuccess = products => ({
  type: Types.GET_PRODUCTS_SUCCESS,
  products,
});

export const createProductSuccess = product => ({
  type: Types.CREATE_PRODUCT_SUCCESS,
  product,
});

export const deleteProductSuccess = id => ({
  type: Types.DELETE_PRODUCT_SUCCESS,
  id,
});

export const updateProductSuccess = product => ({
  type: Types.UPDATE_PRODUCT_SUCCESS,
  product,
});
