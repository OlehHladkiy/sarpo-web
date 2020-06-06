import { Form } from 'antd';
import React, { useEffect } from 'react';
import * as R from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import OnboardingConferencePageView from '../components/OnboardingConferencePageView';
import { getConferenceById } from '../ConferenceReducer';
import { ConferenceOnboardingStep } from '../models/conference';
import {
  normalizeBasicToInitial,
  normalizeBasicConferenceToCreate,
  appendNewStep,
} from '../utils/conference-helpers';
import { updateConference } from '../ConferenceActions';

const OnboardingConferencePage: React.FunctionComponent = () => {
  const [form] = Form.useForm();
  const { conferenceId, onboardingStep } = useParams();

  const conference = useSelector((state: Record<string, any>) =>
    getConferenceById(state, conferenceId),
  );

  const dispatch = useDispatch();

  const getInitialData = (
    onboardingStep: string,
    conferenceData: Record<string, any>,
  ): Record<string, any> => {
    switch (onboardingStep) {
      case ConferenceOnboardingStep.Basic: {
        return normalizeBasicToInitial(conferenceData);
      }
      case ConferenceOnboardingStep.Details: {
        return R.pick(
          ['image', 'summary', 'files', 'description'],
          conferenceData,
        );
      }
      default: {
        return null;
      }
    }
  };

  const getNormalizedData = (
    onboardingStep: string,
    values: Record<string, any>,
  ): Record<string, any> => {
    switch (onboardingStep) {
      case ConferenceOnboardingStep.Basic: {
        return normalizeBasicConferenceToCreate(values);
      }
      default: {
        return values;
      }
    }
  };

  useEffect(() => {
    if (form && Boolean(conference)) {
      const initialData = getInitialData(onboardingStep, conference);

      if (Boolean(initialData)) {
        form.setFieldsValue(initialData);
      }
    }
  }, [form, conference, onboardingStep]);

  const onFinish = async (values: Record<string, any>): Promise<void> => {
    await dispatch(
      updateConference({
        conferenceId,
        onboardedSteps: appendNewStep(
          onboardingStep,
          conference.onboardedSteps,
        ),
        ...getNormalizedData(onboardingStep, values),
      }),
    );
  };

  return R.isEmpty(conference) ? null : (
    <OnboardingConferencePageView
      onboardingStep={onboardingStep}
      form={form}
      tickets={R.propOr([], 'tickets', conference)}
      onFinish={onFinish}
    />
  );
};

export default OnboardingConferencePage;
