/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from 'ramda';
import moment, { Moment } from 'moment';

import { SIGN_IN, SIGN_UP, SIGN_OUT } from '@modules/auth/AuthActions';
import { getGraphqlPayload } from '@store/helpers';

import { FETCH_ME } from './UserActions';

export const STATE_KEY = 'user';

export type UserState = {
  _id?: string;
  email?: string;
  name?: string;
  avatar?: string;
  phone?: string;
  tickets?: string[];
  createdAt?: Date;
};

const initialState: UserState = {
  _id: null,
  email: null,
  name: null,
  avatar: null,
  phone: null,
  tickets: null,
  createdAt: null,
};

const UserReducer = (
  state: UserState = initialState,
  action: any,
): UserState => {
  switch (action.type) {
    case `${SIGN_IN}_SUCCESS`:
    case `${SIGN_UP}_SUCCESS`: {
      return R.mergeDeepRight(
        state,
        R.propOr({}, 'user', getGraphqlPayload(action)),
      );
    }
    case `${FETCH_ME}_SUCCESS`: {
      return R.mergeDeepRight(state, getGraphqlPayload(action));
    }
    case SIGN_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const getUser = R.prop(STATE_KEY);

export const getMyId = R.pathOr<any, any, any, any>('', [STATE_KEY, '_id']);

export const getEmail = R.path<string>([STATE_KEY, 'email']);

export const getEmailNotifications = R.pathOr<string>({}, [
  STATE_KEY,
  'emailNotifications',
]);

export const getProfile = R.path<Record<string, any>>([STATE_KEY, 'profile']);

export const getRole = R.path<Record<string, any>>([
  STATE_KEY,
  'profile',
  'role',
]);

export const getName = R.path<string>([STATE_KEY, 'profile', 'name']);

export const getAvatar = R.path<string>([STATE_KEY, 'profile', 'avatar']);

export const getCreatedDate = R.path<any>([STATE_KEY, 'createdAt']);

export const getIsEmailVerified = R.compose(
  emailConfirmedAt => !!emailConfirmedAt,
  R.path<boolean>([STATE_KEY, 'emailConfirmedAt']),
);

export const getIsNotEmailVerifiedAfterDay = (state: any): Moment | boolean => {
  const isEmailVerified = getIsEmailVerified(state);
  if (isEmailVerified) return false;

  const createdDate = getCreatedDate(state);
  return createdDate
    ? moment(createdDate)
        .add(1, 'days')
        .isBefore(moment())
    : false;
};

export default UserReducer;
