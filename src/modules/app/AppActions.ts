export const namespace = 'APP';
export const BOOTSTRAP = `${namespace}/BOOTSTRAP`;
export const AUTHENTICATED = `${namespace}/AUTHENTICATED`;

export const appBootstrap = () => ({
  type: BOOTSTRAP,
});

export const appAuthenticated = () => ({
  type: AUTHENTICATED,
});
