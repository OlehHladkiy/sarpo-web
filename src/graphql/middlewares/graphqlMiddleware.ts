/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import omitDeep from 'omit-deep';
import * as R from 'ramda';

import { MiddlewareAPI } from 'redux';
import { GraphqlQueryAction, Action } from '@store/models';

interface MiddlewareInterceptor {
  request?: any;
  response?: any;
}

export const SUCCESS_SUFFIX = '_SUCCESS';
export const ERROR_SUFFIX = '_FAIL';

export const getActionTypes = (
  action: { type?: string; types?: any[] },
  {
    errorSuffix = ERROR_SUFFIX,
    successSuffix = SUCCESS_SUFFIX,
  }: { errorSuffix: string; successSuffix: string },
) => {
  if (typeof action.type !== 'undefined') {
    const { type } = action;
    return [type, `${type}${successSuffix}`, `${type}${errorSuffix}`];
  } else if (typeof action.types !== 'undefined') {
    return action.types;
  }

  throw new Error(
    'Action which matched graphql middleware needs to have "type" or "types" key which is not null',
  );
};

const defaultOptions = {
  returnRejectedPromiseOnError: false,
  defaultClientName: 'default',
  isGraphqlRequest: (action: GraphqlQueryAction) =>
    action.payload && action.payload.graphql,
  getRequestConfig: action => action.payload.graphql,
  getClientName: action => action.payload.client,
  getRequestOptions: action => action.payload.options,
  onSuccess: ({ action, next, response }, options) => {
    const nextAction = {
      type: getActionTypes(action, options)[1],
      payload: omitDeep(R.clone(response), ['__typename']),
      meta: {
        previousAction: action,
      },
    };

    next(nextAction);
    return nextAction;
  },
  onError: ({ action, next, error }, options): Record<string, any> => {
    const errorObject = !error.graphQLErrors
      ? {
          data: error.message,
          status: 0,
        }
      : error.graphQLErrors;

    const nextAction = {
      type: getActionTypes(action, options)[2],
      error: errorObject,
      meta: {
        previousAction: action,
      },
    };

    next(nextAction);
    return nextAction;
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onComplete: () => {},
};

const addInterceptor = (target, candidate, injectedParameters): void => {
  if (!candidate) {
    return;
  }

  const successInterceptor =
    typeof candidate === 'function' ? candidate : candidate.success;
  const errorInterceptor = candidate && candidate.error;

  target.use(
    successInterceptor && successInterceptor.bind(null, injectedParameters),
    errorInterceptor && errorInterceptor.bind(null, injectedParameters),
  );
};

const bindInterceptors = (
  client,
  injectedParameters,
  middlewareInterceptors: MiddlewareInterceptor = {},
  clientInterceptors: MiddlewareInterceptor = {},
): void => {
  [
    ...(middlewareInterceptors.request || []),
    ...(clientInterceptors.request || []),
  ].forEach(interceptor => {
    addInterceptor(
      client.interceptors.request,
      interceptor,
      injectedParameters,
    );
  });
  [
    ...(middlewareInterceptors.response || []),
    ...(clientInterceptors.response || []),
  ].forEach(interceptor => {
    addInterceptor(
      client.interceptors.response,
      interceptor,
      injectedParameters,
    );
  });
};

const getSourceAction = (config): Record<string, any> =>
  config.reduxSourceAction;

export const multiClientMiddleware = (
  clients: Record<string, any>,
  customMiddlewareOptions: Record<string, any>,
): Function => {
  const middlewareOptions: any = {
    ...defaultOptions,
    ...customMiddlewareOptions,
  };
  const setupedClients = {};

  return ({ getState, dispatch }: MiddlewareAPI) => next => (
    action: Action,
  ): Function => {
    if (!middlewareOptions.isGraphqlRequest(action)) {
      return next(action);
    }

    const clientName =
      middlewareOptions.getClientName(action) ||
      middlewareOptions.defaultClientName;

    if (!clients[clientName]) {
      throw new Error(
        `Client with name "${clientName}" has not been defined in middleware`,
      );
    }

    if (!setupedClients[clientName]) {
      const clientOptions = {
        ...middlewareOptions,
        ...clients[clientName].options,
      };

      if (clientOptions.interceptors) {
        const middlewareInterceptors = middlewareOptions.interceptors;
        const clientInterceptors =
          clients[clientName].options &&
          clients[clientName].options.interceptors;
        const injectToInterceptor = { getState, dispatch, getSourceAction };
        bindInterceptors(
          clients[clientName].client,
          injectToInterceptor,
          middlewareInterceptors,
          clientInterceptors,
        );
      }

      setupedClients[clientName] = {
        client: clients[clientName].client,
        options: clientOptions,
      };
    }

    const setupedClient = setupedClients[clientName];
    const actionOptions = {
      ...setupedClient.options,
      ...setupedClient.options.getRequestOptions(action),
    };
    const [REQUEST] = getActionTypes(action, actionOptions);
    next({ ...action, type: REQUEST });

    const requestConfig = R.mergeDeepRight(
      {
        ...actionOptions.getRequestConfig(action),
        reduxSourceAction: action,
      },
      {
        variables: {
          token: R.pathOr(null, ['auth', 'token'], getState()),
        },
      },
    );

    const makeRequest = requestConfig.mutation
      ? setupedClient.client.mutate
      : setupedClient.client.query;

    return makeRequest(requestConfig).then(
      response => {
        const newAction = actionOptions.onSuccess(
          { action, next, response, getState, dispatch },
          actionOptions,
        );
        actionOptions.onComplete(
          { action: newAction, next, getState, dispatch },
          actionOptions,
        );
        return newAction;
      },
      error => {
        const newAction = actionOptions.onError(
          { action, next, error, getState, dispatch },
          actionOptions,
        );
        actionOptions.onComplete(
          { action: newAction, next, getState, dispatch },
          actionOptions,
        );
        return actionOptions.returnRejectedPromiseOnError
          ? Promise.reject(newAction)
          : newAction;
      },
    );
  };
};

export default (
  client: Record<string, any>,
  customMiddlewareOptions: Record<string, any> = {},
  customClientOptions?: Record<string, any>,
): Function => {
  const middlewareOptions = { ...defaultOptions, ...customMiddlewareOptions };
  const options = customClientOptions || {};
  return multiClientMiddleware(
    { [middlewareOptions.defaultClientName]: { client, options } },
    middlewareOptions,
  );
};
