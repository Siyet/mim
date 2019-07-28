import React from 'react';
import {Route} from 'react-router';

export function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route {...rest} render={(props) => {
      return (
        // authStore.user ? <Component {...props} /> : <Redirect to="/login"/>
        <Component {...props} />
      );
    }}/>
  );
}
