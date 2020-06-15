import { Form, Input } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

import FormLayout from '../components/FormLayout';

const ConferenceBasicInfoForm: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <FormLayout
      title={t('Basic Info')}
      description={t('Event Description')}
      icon={<AlignRightOutlined />}
    >
      <Form.Item
        name="title"
        rules={[
          { required: true, message: t('Please provide conference title') },
        ]}
      >
        <Input placeholder={t('Enter conference name')} />
      </Form.Item>
      <Form.Item
        name="organizer"
        rules={[{ required: true, message: 'Please enter organizer info' }]}
      >
        <Input placeholder={t('Organizer Info')} />
      </Form.Item>
    </FormLayout>
  );
};

export default ConferenceBasicInfoForm;
