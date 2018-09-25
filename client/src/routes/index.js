import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'components/HomePage';
import Requests from 'features/requests/Requests';
import Products from 'features/products/Products';
import EditProduct from 'features/products/EditProduct';
import NewProduct from 'features/products/NewProduct';
import Locations from 'features/locations/Locations';
import EditLocation from 'features/locations/EditLocation';
import NewLocation from 'features/locations/NewLocation';
import Users from 'features/users/Users';
import EditUser from 'features/users/EditUser';
import NewUser from 'features/users/NewUser';
import Clients from 'features/clients/Clients';
import Messages from 'features/messages/Messages';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Switch>
    <ProtectedRoute exact requiredGroup="RequestListener" path="/requests" component={Requests} />
    <Route exact path="/products" component={Products} />
    <ProtectedRoute exact path="/products/new" component={NewProduct} />
    <ProtectedRoute path="/products/:id" component={EditProduct} />
    <Route exact path="/locations" component={Locations} />
    <ProtectedRoute exact path="/locations/new" component={NewLocation} />
    <ProtectedRoute path="/locations/:id" component={EditLocation} />
    <ProtectedRoute exact requireAdmin component={Users} path="/users" />
    <ProtectedRoute exact requireAdmin component={NewUser} path="/users/new" />
    <ProtectedRoute requireAdmin component={EditUser} path="/users/:id" />
    <ProtectedRoute exact requiredGroup="ClientListener" component={Clients} path="/clients" />
    <Route exact component={Messages} path="/messages" />
    <Route exact path="/" component={HomePage} />
  </Switch>
);

export default AppRoutes;
