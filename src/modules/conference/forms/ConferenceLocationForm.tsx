import { Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EnvironmentOutlined } from '@ant-design/icons';

import FormLayout from '../components/FormLayout';

const ConferenceLocationForm: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <FormLayout
      title={t('Location')}
      description={t('Location Description')}
      icon={<EnvironmentOutlined />}
    >
      <Form.Item
        name="address"
        rules={[{ required: true, message: 'Please enter address' }]}
      >
        <Input placeholder={t('Enter address')} />
      </Form.Item>
    </FormLayout>
  );
};

export default ConferenceLocationForm;
