import * as authActions from './auth';
import * as locationsActions from './locations';
import * as productsActions from './products';
import * as requestsActions from './requests';
import * as usersActions from './users';


export default {
  ...authActions,
  ...locationsActions,
  ...productsActions,
  ...requestsActions,
  ...usersActions,
};
