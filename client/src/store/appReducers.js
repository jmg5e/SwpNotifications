import auth from 'auth/reducer';
import connection from 'connection/reducer';
import settings from 'features/settings/reducer';
import products from 'features/products/reducer';
import locations from 'features/locations/reducer';
import requests from 'features/requests/reducer';
import users from 'features/users/reducer';
import clients from 'features/clients/reducer';
import messages from 'features/messages/reducer';
import loading from 'api/reducer';
import confirm from 'features/confirm/reducer';

export default {
  auth,
  connection,
  settings,
  products,
  locations,
  requests,
  loading,
  users,
  clients,
  messages,
  confirm,
};
