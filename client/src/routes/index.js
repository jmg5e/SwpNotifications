import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'components/DashBoard';
import RequestsPage from 'features/requests/components/RequestsPage';
import Products from 'features/products/Products';
import EditProduct from 'features/products/EditProduct';
import NewProduct from 'features/products/NewProduct';
import Locations from 'features/locations/Locations';
import EditLocation from 'features/locations/EditLocation';
import NewLocation from 'features/locations/NewLocation';
import Users from 'features/users/Users';
import EditUser from 'features/users/EditUser';
import NewUser from 'features/users/NewUser';
import ClientsPage from 'features/clients/components/ClientsPage';
import MessagesPage from 'features/messages/components/MessagesPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Switch>
    <ProtectedRoute exact requiredGroup="RequestListener" path="/requests" component={RequestsPage} />
    <Route exact path="/products" component={Products} />
    <ProtectedRoute exact path="/products/new" component={NewProduct} />
    <ProtectedRoute path="/products/:id" component={EditProduct} />
    <Route exact path="/locations" component={Locations} />
    <ProtectedRoute exact path="/locations/new" component={NewLocation} />
    <ProtectedRoute path="/locations/:id" component={EditLocation} />
    <ProtectedRoute exact requireAdmin component={Users} path="/users" />
    <ProtectedRoute exact requireAdmin component={NewUser} path="/users/new" />
    <ProtectedRoute requireAdmin component={EditUser} path="/users/:id" />
    <ProtectedRoute exact requiredGroup="ClientListener" component={ClientsPage} path="/clients" />
    <Route exact component={MessagesPage} path="/messages" />
    <Route exact path="/" component={HomePage} />
  </Switch>
);

export default AppRoutes;
