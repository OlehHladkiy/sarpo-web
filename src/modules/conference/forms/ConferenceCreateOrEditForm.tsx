import { Button, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import styled from 'styled-components';

import ConferenceBasicInfoForm from './ConferenceBasicInfoForm';
import ConferenceLocationForm from './ConferenceLocationForm';
import ConferenceDateForm from './ConferenceDateForm';
import { ConferenceType, ConferenceDateType } from '../models/conference';

interface ConferenceCreateOrEditFormProps {
  submitButtonName?: string;
  form: FormInstance;
  onFinish: (values: Record<string, any>) => Promise<void>;
}

const ConferenceCreateOrEditForm: React.FunctionComponent<ConferenceCreateOrEditFormProps> = ({
  submitButtonName = 'Create',
  form,
  onFinish,
}: ConferenceCreateOrEditFormProps) => (
  <Form
    initialValues={{
      type: ConferenceType.Venue,
      dateType: ConferenceDateType.Single,
    }}
    form={form}
    onFinish={onFinish}
  >
    <ConferenceBasicInfoForm />
    <ConferenceLocationForm />
    <ConferenceDateForm />
    <SubmitButton htmlType="submit" type="primary">
      {submitButtonName}
    </SubmitButton>
  </Form>
);

const SubmitButton = styled(Button)`
  margin-top: 40px;
  margin-left: 35px;
  height: 45px;
  width: 200px;
`;

export default ConferenceCreateOrEditForm;
