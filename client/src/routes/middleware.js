import Types from 'store/types';
import { push } from 'react-router-redux';

const redirectMiddleware = ({ dispatch }) => next => (action) => {
  switch (action.type) {
    case Types.UPDATE_PRODUCT_SUCCESS:
      dispatch(push('/products'));
      next(action);
      break;
    case Types.CREATE_PRODUCT_SUCCESS:
      dispatch(push('/products'));
      next(action);
      break;

    case Types.UPDATE_LOCATION_SUCCESS:
      dispatch(push('/locations'));
      next(action);
      break;
    case Types.CREATE_LOCATION_SUCCESS:
      dispatch(push('/locations'));
      next(action);
      break;
    case Types.UPDATE_USER_SUCCESS:
      dispatch(push('/users'));
      next(action);
      break;
    case Types.CREATE_USER_SUCCESS:
      dispatch(push('/users'));
      next(action);
      break;
    default:
      next(action);
  }
};

export default redirectMiddleware;
