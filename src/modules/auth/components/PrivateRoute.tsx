// @flow
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Redirect, Route, useHistory, RouteProps } from 'react-router-dom';

import { getIsAuthenticated } from '../AuthReducer';

interface PrivateRouteProps extends RouteProps {
  // eslint-disable-next-line
  component: any;
}

const PrivateRoute: React.SFC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}: PrivateRouteProps) => {
  const history = useHistory();
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/signin');
      return;
    }
  }, [history, isAuthenticated]);

  return (
    <Route
      {...rest}
      render={(props): React.ReactNode => {
        if (isAuthenticated) {
          return <Component {...props} />;
        }

        return <Redirect to="/signin" />;
      }}
    />
  );
};

export default PrivateRoute;
