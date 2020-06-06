import { Form, Input } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import React from 'react';

import RichTextEditor from '@components/RichTextEditor';

import FormLayout from '../components/FormLayout';

const ConferenceDescriptionForm: React.FunctionComponent = () => (
  <FormLayout
    title="Description"
    description="Write a short event summary to get attendees excited"
    icon={<FontSizeOutlined />}
  >
    <Form.Item
      name="summary"
      rules={[{ required: true, message: 'Summary is required!' }]}
    >
      <Input placeholder="Write a short conference summary to get attendees excited." />
    </Form.Item>
    <Form.Item name="description">
      <RichTextEditor isValid={true} minHeight={150} />
    </Form.Item>
  </FormLayout>
);

export default ConferenceDescriptionForm;
