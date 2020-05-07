/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from 'ramda';

import { getGraphqlPayload } from '@store/helpers';

import { SIGN_UP, SIGN_OUT, SIGN_IN } from './AuthActions';

export const STATE_KEY = 'auth';

export type AuthState = {
  _id?: string;
  email?: string;
  token?: string;
  isAuthenticated: boolean;
  isActive: boolean;
};

export const initialState: AuthState = {
  _id: null,
  token: null,
  isAuthenticated: false,
  isActive: false,
  email: null,
};

const buildAuthData = (user: Record<string, any>): Record<string, any> => ({
  ...R.compose(
    R.pick(['_id', 'isActive', 'email']),
    R.pathOr({}, ['user']),
  )(user),
  isAuthenticated: true,
  token: R.pathOr(null, ['token'], user),
});

const AuthReducer = (
  state: AuthState = initialState,
  action: any,
): AuthState => {
  switch (action.type) {
    case `${SIGN_IN}_SUCCESS`:
    case `${SIGN_UP}_SUCCESS`: {
      const user = getGraphqlPayload(action);
      const authData = buildAuthData(user);
      return R.mergeDeepRight(state, authData);
    }
    case SIGN_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const getMyId = R.path<string>([STATE_KEY, '_id']);

export const getToken = R.path<string>([STATE_KEY, 'token']);

export const getIsAuthenticated = R.path<boolean>([
  STATE_KEY,
  'isAuthenticated',
]);

export const getEmail = R.path<string>([STATE_KEY, 'email']);

export default AuthReducer;
