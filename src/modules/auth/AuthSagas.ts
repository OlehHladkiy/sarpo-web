import { message as notify } from 'antd';
import { push } from 'connected-react-router';
import * as R from 'ramda';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  SIGN_IN,
  SIGN_OUT,
} from './AuthActions';

function* signInFailSaga(action): any {
  yield call(notify.error, {
    message: R.pathOr(
      'Email or Password is incorrect',
      ['error', '0', 'message'],
      action,
    ),
  });
}

function* logoutSaga(): any {
  yield put(push('/login'));
}

function* authSagas(): any {
  yield all([
    yield takeEvery(`${SIGN_IN}_FAIL`, signInFailSaga),
    yield takeEvery(SIGN_OUT, logoutSaga),
  ]);
}

export default authSagas;
