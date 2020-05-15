import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ConferencesPageView from '../components/ConferencesPageView';
import { fetchConferences } from '../ConferenceActions';
import { getConferences } from '../ConferenceReducer';

const ConferencesPage: React.FunctionComponent = () => {
  const conferences = useSelector(getConferences);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConferences());
  }, []);

  return <ConferencesPageView conferences={conferences} />;
};

export default ConferencesPage;
