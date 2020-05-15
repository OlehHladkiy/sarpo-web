import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import appSagas from '@modules/app/AppSagas';
import authSagas from '@modules/auth/AuthSagas';
import conferencesSaga from '@modules/conference/ConferenceSagas';

function* rootSaga(): SagaIterator {
  yield all([fork(appSagas), fork(authSagas), fork(conferencesSaga)]);
}

export default rootSaga;
