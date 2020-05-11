import { Form, Input } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import React from 'react';

import FormLayout from '../components/FormLayout';

const BasicInfoConferenceForm: React.FunctionComponent = () => (
  <FormLayout
    title="Basic Info"
    description="Name your event and tell event-goers why they should come. Add details that highlight what makes it unique."
    icon={<AlignRightOutlined />}
  >
    <Form.Item
      name="title"
      rules={[{ required: true, message: 'Please provide conference title' }]}
    >
      <Input placeholder="Enter conference name" />
    </Form.Item>
    <Form.Item
      name="organizer"
      rules={[{ required: true, message: 'Please enter organizer info' }]}
    >
      <Input placeholder="Tell attendees who is organizing this event" />
    </Form.Item>
  </FormLayout>
);

export default BasicInfoConferenceForm;
