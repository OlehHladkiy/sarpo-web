import { Action } from '@store/models';

const warn = error => {
  console.warn(error.message || error); // eslint-disable-line no-console
  throw error; // To let the caller handle the rejection
};

const promiseMiddleware = () => (next: (value?: any) => any) => (
  action: Action | Promise<any>
) => {
  if (typeof (action as Promise<any>).then === 'function') {
    Promise.resolve(action).then(next, warn);
  } else {
    next(action);
  }
};

export default promiseMiddleware;
