import { message as notify } from 'antd';
import * as R from 'ramda';
import { push } from 'connected-react-router';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { CREATE_CONFERENCE } from './ConferenceActions';
import { ConferenceOnboardingStep } from './models/conference';

import { getGraphqlPayload } from '@store/helpers';

function* createdConferenceSaga(action: any): SagaIterator {
  const createdConference = getGraphqlPayload(action);

  yield put(
    push(
      `/conference/${R.prop('_id', createdConference)}/${
        ConferenceOnboardingStep.Details
      }`,
    ),
  );
  yield call(
    notify.success,
    `${R.prop(
      'title',
      createdConference,
    )} - conference was successfully created`,
  );
}

function* authSagas(): SagaIterator {
  yield all([
    yield takeEvery(`${CREATE_CONFERENCE}_SUCCESS`, createdConferenceSaga),
  ]);
}

export default authSagas;
