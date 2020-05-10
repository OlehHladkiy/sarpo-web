import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOut } from '../AuthActions';

const LogoutPage: React.FunctionComponent = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  dispatch(signOut());
  history.push('/');

  return null;
};

export default LogoutPage;
