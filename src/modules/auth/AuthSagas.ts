import { message as notify } from 'antd';
import { push } from 'connected-react-router';
import * as R from 'ramda';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { SIGN_IN, SIGN_OUT } from './AuthActions';

function* signInFailSaga(action): SagaIterator {
  yield call(notify.error, {
    message: R.pathOr(
      'Email or Password is incorrect',
      ['error', '0', 'message'],
      action,
    ),
  });
}

function* logoutSaga(): SagaIterator {
  yield put(push('/signin'));
}

function* authSagas(): SagaIterator {
  yield all([
    yield takeEvery(`${SIGN_IN}_FAIL`, signInFailSaga),
    yield takeEvery(SIGN_OUT, logoutSaga),
  ]);
}

export default authSagas;
