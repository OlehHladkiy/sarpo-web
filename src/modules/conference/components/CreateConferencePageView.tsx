import { FormInstance } from 'antd/lib/form';
import React from 'react';
import styled from 'styled-components';

import LayoutHeader from '@components/LayoutHeader';

import CreateOrEditConferenceForm from '../forms/ConferenceCreateOrEditForm';

interface CreateConferencePageViewProps {
  form: FormInstance;
  onFinish: (values: Record<string, any>) => Promise<void>;
}

const CreateConferencePageView: React.FunctionComponent<CreateConferencePageViewProps> = ({
  form,
  onFinish,
}: CreateConferencePageViewProps) => (
  <Wrapper>
    <LayoutHeader />
    <FormWrapper>
      <CreateOrEditConferenceForm form={form} onFinish={onFinish} />
    </FormWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const FormWrapper = styled.div`
  margin: 0 25%;

  input {
    height: 45px;
  }

  @media (max-width: 768px) {
    margin: 0 40%;
  }

  @media (max-width: 1024px) {
    margin: 0 15%;
  }
`;

export default CreateConferencePageView;
