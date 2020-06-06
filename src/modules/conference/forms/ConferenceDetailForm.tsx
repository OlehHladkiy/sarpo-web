import { Button, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import styled from 'styled-components';

import ConferenceMainImageForm from './ConferenceMainImageForm';
import ConferenceDescriptionForm from './ConferenceDescriptionForm';
import ConferenceFilesForm from './ConferenceFilesForm';

interface ConferenceDetailFormProps {
  form: FormInstance;
  onFinish: (values: Record<string, any>) => Promise<void>;
}

const ConferenceDetailForm: React.FunctionComponent<ConferenceDetailFormProps> = ({
  form,
  onFinish,
}: ConferenceDetailFormProps) => (
  <Form form={form} onFinish={onFinish}>
    <ConferenceMainImageForm />
    <ConferenceFilesForm />
    <ConferenceDescriptionForm />
    <SubmitButton htmlType="submit" type="primary">
      Update
    </SubmitButton>
  </Form>
);

const SubmitButton = styled(Button)`
  margin-top: 40px;
  margin-left: 35px;
  height: 45px;
  width: 200px;
`;

export default ConferenceDetailForm;
