import * as R from 'ramda';

import { SIGN_OUT } from '@modules/auth/AuthActions';
import { getGraphqlPayload } from '@store/helpers';

import {
  CREATE_CONFERENCE,
  FETCH_CONFERENCES,
  FETCH_CONFERENCE,
} from './ConferenceActions';

export const STATE_KEY = 'conference';

export type ConferenceState = {
  data: Record<string, any>;
};

const initialState: ConferenceState = {
  data: {},
};

const ConferenceReducer = (
  state: ConferenceState = initialState,
  action: any,
): ConferenceState => {
  switch (action.type) {
    case `${FETCH_CONFERENCES}_SUCCESS`: {
      const conferences = R.compose(
        R.indexBy(R.prop('_id')),
        R.defaultTo([]),
        getGraphqlPayload,
      )(action);

      return R.assoc('data', conferences, state);
    }
    case `${FETCH_CONFERENCE}_SUCCESS`:
    case `${CREATE_CONFERENCE}_SUCCESS`: {
      const conference = R.defaultTo({}, getGraphqlPayload(action));

      return R.assocPath(['data', conference._id], conference, state);
    }
    case SIGN_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const getConferences = R.compose(
  R.values,
  R.pathOr({}, [STATE_KEY, 'data']),
);

export const getConferenceById = (
  state: Record<string, any>,
  conferenceId: string,
): Record<string, any> =>
  R.pathOr(null, [STATE_KEY, 'data', conferenceId], state);

export const getConferenceTitle = (
  state: Record<string, any>,
  conferenceId: string,
): string => R.propOr(null, 'title', getConferenceById(state, conferenceId));

export const getConferenceStartDate = (
  state: Record<string, any>,
  conferenceId: string,
): string =>
  R.propOr(null, 'startDate', getConferenceById(state, conferenceId));

export const getConferenceStartTime = (
  state: Record<string, any>,
  conferenceId: string,
): string =>
  R.propOr(null, 'startTime', getConferenceById(state, conferenceId));

export const getConferenceOnboardedSteps = (
  state: Record<string, any>,
  conferenceId: string,
): string[] =>
  R.propOr([], 'onboardedSteps', getConferenceById(state, conferenceId));

export default ConferenceReducer;
