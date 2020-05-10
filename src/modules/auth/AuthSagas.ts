import { message as notify } from 'antd';
import { push } from 'connected-react-router';
import * as R from 'ramda';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { SIGN_IN, SIGN_OUT, SIGN_UP } from './AuthActions';

function* signInFailSaga(action): SagaIterator {
  yield call(notify.error, {
    message: R.pathOr(
      'Email or Password is incorrect',
      ['error', '0', 'message'],
      action,
    ),
  });
}

function* signOutSaga(): SagaIterator {
  yield put(push('/signin'));
}

function* authorizedSuccessfullySaga(): SagaIterator {
  yield put(push('/'));
}

function* authSagas(): SagaIterator {
  yield all([
    yield takeEvery(`${SIGN_UP}_SUCCESS`, authorizedSuccessfullySaga),
    yield takeEvery(`${SIGN_IN}_SUCCESS`, authorizedSuccessfullySaga),
    yield takeEvery(`${SIGN_IN}_FAIL`, signInFailSaga),
    yield takeEvery(SIGN_OUT, signOutSaga),
  ]);
}

export default authSagas;
