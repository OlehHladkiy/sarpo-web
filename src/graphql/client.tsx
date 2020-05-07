/* eslint-disable no-unused-vars */
import ApolloClient, { Operation } from 'apollo-boost'; // eslint-disable-line import/no-named-as-default
import * as R from 'ramda';
import { parseCookies } from 'nookies';

import AppConfig from '@config/AppConfig';

const client = new ApolloClient({
  uri: AppConfig.apiUrl,
  request: (operation: Operation): Promise<void> | void => {
    const cookies = parseCookies();
    const token = R.propOr(
      R.prop('token', cookies),
      'token',
      operation.variables,
    );
    operation.variables = R.omit(['token'], operation.variables);

    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }
  },
});

export default client;
