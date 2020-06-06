import { Form } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import React from 'react';

import FormLayout from '../components/FormLayout';
import ImageUploadDraggerContainer from '../containers/ImageUploadDraggerContainer';

const ConferenceMainImageForm: React.FunctionComponent = () => (
  <FormLayout
    icon={<PictureOutlined />}
    title="Main Conference Image"
    description="This is the first image attendees will see at the top of your listing."
  >
    <Form.Item name="image" valuePropName="value">
      <ImageUploadDraggerContainer />
    </Form.Item>
  </FormLayout>
);

export default ConferenceMainImageForm;
