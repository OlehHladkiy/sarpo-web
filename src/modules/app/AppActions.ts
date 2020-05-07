export const namespace = 'APP';
export const BOOTSTRAP = `${namespace}/BOOTSTRAP`;
export const AUTHENTICATED = `${namespace}/AUTHENTICATED`;

import { Action } from '@store/models';

export const appBootstrap = (): Action => ({
  type: BOOTSTRAP,
});

export const appAuthenticated = (): Action => ({
  type: AUTHENTICATED,
});
