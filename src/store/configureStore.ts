/* eslint-disable @typescript-eslint/no-explicit-any */
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, Persistor } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import graphqlClient from '@graphql/client';
import graphqlMiddleware from '@graphql/middlewares/graphqlMiddleware';

import axiosMiddleware from './middlewares/axiosMiddleware';
import loggerMiddleware from './middlewares/loggerMiddleware';
import promiseMiddleware from './middlewares/promiseMiddleware';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

interface ConfiguredStore {
  history: History;
  persistor: Persistor;
  store: Record<string, any>;
}

export default (initialState = {}): ConfiguredStore => {
  const history = createBrowserHistory();
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    routerMiddleware(history),
    axiosMiddleware,
    graphqlMiddleware(graphqlClient),
    thunk,
    promiseMiddleware,
    sagaMiddleware,
  ];

  if (typeof jest === 'undefined' && process.env.NODE_ENV !== 'production') {
    middlewares.push(loggerMiddleware);
  }

  const composeEnhancers = isServer
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./rootReducer').default(history);
      store.replaceReducer(nextRootReducer);
    });
  }

  return { history, persistor, store };
};
