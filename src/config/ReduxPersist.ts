import storage from 'redux-persist/lib/storage';

import { STATE_KEY as AUTH_STATE_KEY } from '@modules/auth/AuthReducer';
import { STATE_KEY as USER_STATE_KEY } from '@modules/user/UserReducer';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    storage,
    key: 'primary',
    whitelist: [AUTH_STATE_KEY, USER_STATE_KEY]
  }
};

export default REDUX_PERSIST;
