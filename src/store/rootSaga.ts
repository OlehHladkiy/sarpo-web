import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import appSagas from '@modules/app/AppSagas';
import authSagas from '@modules/auth/AuthSagas';

function* rootSaga(): SagaIterator {
  yield all([fork(appSagas), fork(authSagas)]);
}

export default rootSaga;
