import { all, fork } from 'redux-saga/effects';

import appSagas from '@modules/app/AppSagas';
import authSagas from '@modules/auth/AuthSagas';

function* rootSaga(): any {
  yield all([
    fork(appSagas),
    fork(authSagas),
  ]);
}

export default rootSaga;
