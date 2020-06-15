import { Form, Input } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

import RichTextEditor from '@components/RichTextEditor';

import FormLayout from '../components/FormLayout';

const ConferenceDescriptionForm: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <FormLayout
      title={t('Description')}
      description={t('Description Detail')}
      icon={<FontSizeOutlined />}
    >
      <Form.Item
        name="summary"
        rules={[{ required: true, message: t('required') }]}
      >
        <Input placeholder={t('Description Placeholder')} />
      </Form.Item>
      <Form.Item name="description">
        <RichTextEditor isValid={true} minHeight={150} />
      </Form.Item>
    </FormLayout>
  );
};

export default ConferenceDescriptionForm;
