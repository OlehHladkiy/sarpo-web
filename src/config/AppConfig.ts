import * as R from 'ramda';

export default {
  apiUrl: R.defaultTo(
    'http://localhost:4001',
    process.env.SARPO_API_URL,
  ),
};
