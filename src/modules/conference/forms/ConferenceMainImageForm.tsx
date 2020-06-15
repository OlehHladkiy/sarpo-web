import { Form } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

import FormLayout from '../components/FormLayout';
import ImageUploadDraggerContainer from '../containers/ImageUploadDraggerContainer';

const ConferenceMainImageForm: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <FormLayout
      icon={<PictureOutlined />}
      title={t('Main Conference Image')}
      description={t('Image Desc')}
    >
      <Form.Item name="image" valuePropName="value">
        <ImageUploadDraggerContainer />
      </Form.Item>
    </FormLayout>
  );
};

export default ConferenceMainImageForm;
