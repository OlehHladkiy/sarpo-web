import { Form } from 'antd';
import React from 'react';

import LayoutHeader from '@components/LayoutHeader';

import CreateOrEditConferenceForm from '../forms/CreateOrEditConferenceForm';

const CreateConferencePage: React.FunctionComponent = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, any>): void => {
    console.log(values);
  };

  return (
    <div>
      <LayoutHeader />
      <CreateOrEditConferenceForm form={form} onFinish={onFinish} />
    </div>
  );
};

export default CreateConferencePage;
