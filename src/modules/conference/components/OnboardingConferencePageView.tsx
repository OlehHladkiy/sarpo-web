import React from 'react';
import { FormInstance } from 'antd/lib/form';
import styled from 'styled-components';

import Layout from '@components/Layout';

import ConferenceCreateOrEditForm from '../forms/ConferenceCreateOrEditForm';
import ConferenceDetailForm from '../forms/ConferenceDetailForm';
import { ConferenceOnboardingStep } from '../models/conference';
import ConferenceTicketsContainer from '../containers/ConferenceTicketsContainer';

interface OnboardingConferencePageProps {
  onboardingStep: string;
  tickets: Record<string, any>[];
  form: FormInstance;
  onFinish: (values: Record<string, any>) => Promise<void>;
}

const OnboardingConferencePage: React.FunctionComponent<OnboardingConferencePageProps> = ({
  onboardingStep,
  tickets,
  form,
  onFinish,
}: OnboardingConferencePageProps) => (
  <Layout>
    <FormWrapper>
      {onboardingStep === ConferenceOnboardingStep.Basic && (
        <ConferenceCreateOrEditForm
          form={form}
          onFinish={onFinish}
          submitButtonName="Update"
        />
      )}
      {onboardingStep === ConferenceOnboardingStep.Details && (
        <ConferenceDetailForm form={form} onFinish={onFinish} />
      )}
      {onboardingStep === ConferenceOnboardingStep.Tickets && (
        <ConferenceTicketsContainer initialTickets={tickets} />
      )}
    </FormWrapper>
  </Layout>
);

const FormWrapper = styled.div`
  margin: 0 15%;
  padding-bottom: 40px;

  input {
    height: 45px;
  }

  @media (max-width: 768px) {
    margin: 0 30%;
  }

  @media (max-width: 1024px) {
    margin: 0 10%;
  }
`;

export default OnboardingConferencePage;
