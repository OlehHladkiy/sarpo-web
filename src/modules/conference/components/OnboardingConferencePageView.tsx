import React from 'react';
import { FormInstance } from 'antd/lib/form';
import styled from 'styled-components';

import Layout from '@components/Layout';

import CreateOrEditConferenceForm from '../forms/CreateOrEditConferenceForm';

interface OnboardingConferencePageProps {
  onboardingStep: string;
  form: FormInstance;
  onFinish: (values: Record<string, any>) => Promise<void>;
}

const OnboardingConferencePage: React.FunctionComponent<OnboardingConferencePageProps> = ({
  onboardingStep,
  form,
  onFinish,
}: OnboardingConferencePageProps) => (
  <Layout>
    <FormWrapper>
      {onboardingStep === 'basic' && (
        <CreateOrEditConferenceForm form={form} onFinish={onFinish} />
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
