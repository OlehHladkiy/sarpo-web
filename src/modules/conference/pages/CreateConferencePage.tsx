import { Form } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

import { normalizeBasicConferenceToCreate } from '../utils/conference-helpers';
import { createConference } from '../ConferenceActions';
import CreateConferencePageView from '../components/CreateConferencePageView';

const CreateConferencePage: React.FunctionComponent = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = async (values: Record<string, any>): Promise<void> => {
    const normalizedData = normalizeBasicConferenceToCreate(values);

    await dispatch(createConference(normalizedData));
  };

  return <CreateConferencePageView form={form} onFinish={onFinish} />;
};

export default CreateConferencePage;
