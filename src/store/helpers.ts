import * as R from 'ramda';

export const getGraphqlPayload = (
  action: Object,
  defaultPayload: any = null
): any => {
  const queryKey = R.pathOr(
    '',
    ['meta', 'previousAction', 'payload', 'key'],
    action
  );
  return R.pathOr(defaultPayload, ['payload', 'data', queryKey], action);
};
