import { Button, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import styled from 'styled-components';

import BasicInfoConferenceForm from './BasicInfoConferenceForm';
import LocationConferenceForm from './LocationConferenceForm';
import DateConferenceForm from './DateConferenceForm';
import { ConferenceType, ConferenceDateType } from '../models/conference';

interface CreateOrEditConferenceFormProps {
  form: FormInstance;
  onFinish: (values: Record<string, any>) => Promise<void>;
}

const CreateOrEditConferenceForm: React.FunctionComponent<CreateOrEditConferenceFormProps> = ({
  form,
  onFinish,
}: CreateOrEditConferenceFormProps) => (
  <Form
    initialValues={{
      type: ConferenceType.Venue,
      dateType: ConferenceDateType.Single,
    }}
    form={form}
    onFinish={onFinish}
  >
    <BasicInfoConferenceForm />
    <LocationConferenceForm />
    <DateConferenceForm />
    <SubmitButton htmlType="submit" type="primary">
      Create
    </SubmitButton>
  </Form>
);

const SubmitButton = styled(Button)`
  margin-top: 40px;
  margin-left: 35px;
  height: 45px;
  width: 200px;
`;

export default CreateOrEditConferenceForm;
