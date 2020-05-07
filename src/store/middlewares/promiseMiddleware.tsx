const warn = (error): Error => {
  console.warn(error.message || error); // eslint-disable-line no-console
  throw error; // To let the caller handle the rejection
};

const promiseMiddleware = () => (next: (value?: any) => any) => (
  action: Promise<any>,
): void => {
  if (typeof action.then === 'function') {
    Promise.resolve(action).then(next, warn);
  } else {
    next(action);
  }
};

export default promiseMiddleware;
