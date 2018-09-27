import auth from 'auth/types';
import connection from 'connection/types';
import clients from 'features/clients/types';
import locations from 'features/locations/types';
import products from 'features/products/types';
import requests from 'features/requests/types';
import settings from 'features/settings/types';
import users from 'features/users/types';
import messages from 'features/messages/types';

const Types = {
  ...auth,
  ...clients,
  ...connection,
  ...locations,
  ...products,
  ...requests,
  ...settings,
  ...users,
  ...messages,
};

export default Types;
