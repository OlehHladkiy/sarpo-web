import { Form } from 'antd';
import React, { useEffect } from 'react';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import OnboardingConferencePageView from '../components/OnboardingConferencePageView';
import { getConferenceById } from '../ConferenceReducer';
import { VenueConferenceOnboardingStep } from '../models/conference';
import { normalizeBasicToInitial } from '../utils/conference-helpers';

const OnboardingConferencePage: React.FunctionComponent = () => {
  const [form] = Form.useForm();
  const { conferenceId, onboardingStep } = useParams();

  const conference = useSelector((state: Record<string, any>) =>
    getConferenceById(state, conferenceId),
  );

  const getInitialData = (): Record<string, any> => {
    switch (onboardingStep) {
      case VenueConferenceOnboardingStep.Basic: {
        return normalizeBasicToInitial(conference);
      }
      default: {
        return {};
      }
    }
  };

  useEffect(() => {
    if (form && !R.isEmpty(conference)) {
      const initialData = getInitialData();
      form.setFieldsValue(initialData);
    }
  }, [form, conference]);

  const onFinish = async (values: Record<string, any>): Promise<void> => {
    console.log(values);
  };

  return R.isEmpty(conference) ? null : (
    <OnboardingConferencePageView
      onboardingStep={onboardingStep}
      form={form}
      onFinish={onFinish}
    />
  );
};

export default OnboardingConferencePage;
