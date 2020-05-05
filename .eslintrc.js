const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    jsx: true,
  },
  extends: [
    'react-app',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
  },
  plugins: ['prettier', 'fp', 'import', 'ramda', 'react-hooks'],
  globals: {
    __DEV__: true,
    google: true,
  },
  rules: {
    // General
    'comma-dangle': ['error', 'always-multiline'],
    'global-require': 'warn',
    'key-spacing': 'off',
    'max-len': ['warn', 180, 4],
    'no-else-return': ['error', { allowElseIf: true }],
    'no-multi-spaces': 'off',
    'no-underscore-dangle': 'off',
    'no-var': 'error',
    'no-unused-vars': 'warn',
    // FP
    'fp/no-arguments': 'error',
    'fp/no-class': 'off',
    'fp/no-delete': 'error',
    'fp/no-events': 'error',
    'fp/no-get-set': 'error',
    'fp/no-let': 'error',
    'fp/no-loops': 'error',
    'fp/no-mutating-assign': 'error',
    'fp/no-mutating-methods': 'off',
    'fp/no-mutation': 'off',
    'fp/no-nil': 'off',
    'fp/no-proxy': 'error',
    'fp/no-rest-parameters': 'off',
    'fp/no-this': 'off',
    'fp/no-throw': 'off',
    'fp/no-unused-expression': 'off',
    'fp/no-valueof-field': 'error',
    // Import
    'import/named': 'off',
    // JSX a11y
    'jsx-a11y/href-no-hash': 'off',
    // Ramda
    'ramda/always-simplification': 'error',
    'ramda/any-pass-simplification': 'error',
    'ramda/both-simplification': 'error',
    'ramda/complement-simplification': 'error',
    'ramda/compose-pipe-style': 'off',
    'ramda/compose-simplification': 'error',
    'ramda/cond-simplification': 'error',
    'ramda/either-simplification': 'error',
    'ramda/eq-by-simplification': 'error',
    'ramda/filter-simplification': 'error',
    'ramda/if-else-simplification': 'error',
    'ramda/map-simplification': 'error',
    'ramda/merge-simplification': 'error',
    'ramda/no-redundant-and': 'error',
    'ramda/no-redundant-not': 'error',
    'ramda/no-redundant-or': 'error',
    'ramda/pipe-simplification': 'error',
    'ramda/prefer-both-either': 'error',
    'ramda/prefer-complement': 'error',
    'ramda/prefer-ramda-boolean': 'error',
    'ramda/prop-satisfies-simplification': 'error',
    'ramda/reduce-simplification': 'error',
    'ramda/reject-simplification': 'error',
    'ramda/set-simplification': 'error',
    'ramda/unless-simplification': 'error',
    'ramda/when-simplification': 'error',
    // React hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
  settings: {
    react: {
      version: '16.7',
    },
    'import/resolver': {
      webpack: {
        config: path.resolve('./config/webpack.config.js'),
      },
    },
  },
};