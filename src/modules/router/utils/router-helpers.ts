import * as R from 'ramda';
import { Location } from 'history';

const FULL_SIZE_ROUTE = [/^\/signin$/, /^\/signup$/];

export const getIsFullSize = (location: Location): boolean =>
  FULL_SIZE_ROUTE.map(route => route.test(location.pathname)).some(v => v);

export const getCurrentPath = (location: Location): string =>
  R.compose(R.last, R.split('/'))(location.pathname);
