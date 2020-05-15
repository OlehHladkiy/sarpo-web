/* eslint-disable react/display-name */
import React from 'react';
import Loadable from 'react-loadable';
import { Route, Redirect, Switch } from 'react-router-dom';

import Preloader from '@components/Preloader';
import PrivateRoute from '@modules/auth/components/PrivateRoute';

const SignInPage = Loadable({
  loader: () =>
    import(
      '@modules/auth/pages/SignInPage' /* webpackChunkName: "SignInPage" */
    ),
  loading: () => <Preloader />,
});

const SignUpPage = Loadable({
  loader: () =>
    import(
      '@modules/auth/pages/SignUpPage' /* webpackChunkName: "SignUpPage" */
    ),
  loading: () => <Preloader />,
});

const SignOutPage = Loadable({
  loader: () =>
    import(
      '@modules/auth/pages/SignOutPage' /* webpackChunkName: "SignOutPage" */
    ),
  loading: () => <Preloader />,
});

const DashboardPage = Loadable({
  loader: () =>
    import(
      '@modules/dashboard/pages/DashboardPage' /* webpackChunkName: "DashboardPage" */
    ),
  loading: () => <Preloader />,
});

const ConferencesPage = Loadable({
  loader: () =>
    import(
      '@modules/conference/pages/ConferencesPage' /* webpackChunkName: "ConferencesPage" */
    ),
  loading: () => <Preloader />,
});

const CreateConferencePage = Loadable({
  loader: () =>
    import(
      '@modules/conference/pages/CreateConferencePage' /* webpackChunkName: "CreateConferencePage" */
    ),
  loading: () => <Preloader />,
});

const OnboardingConferencePage = Loadable({
  loader: () =>
    import(
      '@modules/conference/pages/OnboardingConferencePage' /* webpackChunkName: "OnboardingConferencePage" */
    ),
  loading: () => <Preloader />,
});

const NotFoundPage = Loadable({
  loader: () =>
    import('@components/NotFound' /* webpackChunkName: "NotFoundPage" */),
  loading: () => <Preloader />,
});

export default (
  <>
    <Switch>
      <PrivateRoute
        exact
        path="/"
        component={(): React.ReactNode => <Redirect to="/conferences" />}
      />
      <Route exact path="/signin" component={SignInPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/signout" component={SignOutPage} />

      <PrivateRoute
        exact
        path="/conference/:conferenceId/dashboard"
        component={DashboardPage}
      />
      <PrivateRoute exact path="/conferences" component={ConferencesPage} />
      <PrivateRoute
        exact
        path="/conferences/create"
        component={CreateConferencePage}
      />
      <PrivateRoute
        exact
        path="/conference/:conferenceId/:onboardingStep(basic|details|tickets)"
        component={OnboardingConferencePage}
      />

      {/* Catch all routes */}
      <Route component={NotFoundPage} />
    </Switch>
  </>
);
