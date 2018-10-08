import * as authActions from './auth';
import * as locationsActions from './locations';
import * as productsActions from './products';
import * as usersActions from './users';

export default {
  ...authActions,
  ...locationsActions,
  ...productsActions,
  ...usersActions,
};
