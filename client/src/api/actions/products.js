import Types from 'api/types';
import * as actions from 'features/products/actions';
import { toastrError } from 'notifications/toastr';

export const getProducts = () => ({
  type: Types.API,
  label: 'GET Products',
  endPoint: '/api/products',
  success: actions.getProductsSuccess,
  failed: toastrError('GET Products Failed.'),
  requestOptions: {
    method: 'GET',
  },
});

export const createProduct = product => ({
  type: Types.API_AUTHENTICATED,
  label: 'Create product',
  endPoint: '/api/products',
  success: actions.createProductSuccess,
  failed: toastrError('Create product Failed.'),
  requestOptions: {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  },
});

export const deleteProduct = id => ({
  type: Types.API_AUTHENTICATED,
  label: `Delete Product: ${id}`,
  endPoint: `/api/products/${id}`,
  success: () => actions.deleteProductSuccess(id),
  failed: toastrError(`Delete Product: ${id} Failed.`),
  requestOptions: {
    method: 'DELETE',
  },
});

export const updateProduct = product => ({
  type: Types.API_AUTHENTICATED,
  label: `Update Product: ${product.id}`,
  endPoint: `/api/products/${product.id}`,
  success: () => actions.updateProductSuccess(product),
  failed: toastrError(`Update Product: ${product.id} Failed.`),
  requestOptions: {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  },
});
