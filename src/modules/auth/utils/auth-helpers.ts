// @flow
import * as R from 'ramda';
import owasp from 'owasp-password-strength-test';

owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 10,
  minPhraseLength: 20,
  minOptionalTestsToPass: 4,
});

export interface TestPasswordInfo {
  error: string;
  strong: string;
  isPassphrase: boolean;
}

/**
 * Validate strong user password.
 * @param {string} password - user password.
 * @returns {Object} owasp object.
 */
export const testPasswordStrength = (password = ''): TestPasswordInfo => {
  const result = owasp.test(password);
  const nextError = R.compose(R.head, R.propOr([], 'errors'))(result);

  return {
    error: R.path(['errors', 'length'], result) !== 5 ? nextError : null,
    strong: R.prop('strong', result),
    isPassphrase: R.prop('isPassphrase', result),
  };
};
