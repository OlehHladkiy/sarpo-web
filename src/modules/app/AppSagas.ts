// @flow

import Loadable from 'react-loadable';
import { REHYDRATE } from 'redux-persist';
import { SagaIterator } from 'redux-saga';
import {
  all,
  fork,
  put,
  putResolve,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { SIGN_IN } from '@modules/auth/AuthActions';
import { getIsAuthenticated } from '@modules/auth/AuthReducer';
import { fetchMe } from '@modules/user/UserActions';

import { appAuthenticated, appBootstrap, BOOTSTRAP } from './AppActions';

function* appBootstrapSaga(): SagaIterator {
  const isAuthenticated = yield select(getIsAuthenticated);

  if (isAuthenticated) {
    yield putResolve(fetchMe());
  }
  yield put(appBootstrap());
}

function* appAuthenticatedSaga(): SagaIterator {
  // eslint-disable-next-line fp/no-loops
  while (true) {
    yield take([REHYDRATE, `${SIGN_IN}_SUCCESS`]);
    const isAuthenticated = yield select(getIsAuthenticated);

    if (isAuthenticated) {
      yield put(appAuthenticated());
    }
  }
}

function* loadPages(): SagaIterator {
  yield Loadable.preloadAll();
}

function* appSagas(): SagaIterator {
  yield all([
    takeLatest(REHYDRATE, appBootstrapSaga),
    fork(appAuthenticatedSaga),
    takeLatest(BOOTSTRAP, loadPages),
  ]);
}

export default appSagas;
