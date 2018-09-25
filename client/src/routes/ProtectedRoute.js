import React from 'react';
import { Route } from 'react-router-dom';
import IfAuthenticated from 'auth/IfAuthenticated';
import NotAuthorized from 'components/NotAuthorized';

const ProtectedRoute = props => (
  <IfAuthenticated
    {...props}
    renderElse={() => <Route {...props} component={NotAuthorized} />}
  >
    <Route {...props} />
  </IfAuthenticated>
);

export default ProtectedRoute;
