import Types from 'store/types';
import { actions as toastrActions } from 'react-redux-toastr';
import products from 'features/products/selectors';
// import clients from 'features/clients/selectors';

const notificationMiddleware = ({ dispatch, getState }) => next => (action) => {
  const handlers = {
    [Types.REQUESTS_DISMISSED]: () => {
      const { requests, dismissedBy } = action.event;
      const state = getState();
      const dismissedProducts = requests.map(r => products.getById(r.productId)(state));
      dispatch(
        toastrActions.add({
          type: 'info',
          title: `Product Requests Dissmised By ${dismissedBy}`,
          message: dismissedProducts.map(p => `${p.name}, `),
        }),
      );
    },

    [Types.PRODUCT_REQUEST_SUCCESS]: () => {
      const { productId } = action.request;
      const state = getState();
      const product = products.getById(productId)(state);
      dispatch(
        toastrActions.add({
          type: 'info',
          title: 'You Successfully Requested Product',
          message: `Product: ${product.name || ''}`,
        }),
      );
    },

    [Types.REQUEST_RECIEVED]: () => {
      const { productId, clientIdentifier } = action.request;

      const state = getState();
      const product = products.getById(productId)(state);
      dispatch(
        toastrActions.add({
          type: 'info',
          title: `${clientIdentifier} Requested Product`,
          message: `Product: ${product.name || ''}`,
        }),
      );
    },

    [Types.MESSAGE_RECIEVED]: () => {
      const { from, text } = action.message;
      dispatch(
        toastrActions.add({
          type: 'info',
          title: `New Message from ${from}`,
          message: text,
        }),
      );
    },
  };

  if (typeof handlers[action.type] === 'function') handlers[action.type]();

  next(action);
};

export default notificationMiddleware;
