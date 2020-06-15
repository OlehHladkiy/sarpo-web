import { Form, DatePicker, TimePicker } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldTimeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import FormLayout from '../components/FormLayout';

const ConferenceDateForm: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <FormLayout
      title={t('Date and time')}
      description={t('Date Description')}
      icon={<FieldTimeOutlined />}
    >
      <Title>{t('Start and end times')}</Title>
      <Form.Item
        name="date"
        rules={[{ required: true, message: t('Date Required') }]}
      >
        <DatePicker.RangePicker
          placeholder={[t('Start Date'), t('End Date')]}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="time"
        rules={[{ required: true, message: t('Time Required') }]}
      >
        <TimePicker.RangePicker
          placeholder={[t('Start Time'), t('End Time')]}
          autoComplete="off"
          picker="time"
          format="HH:mm"
        />
      </Form.Item>
    </FormLayout>
  );
};

const Title = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
  font-size: 0.875rem;
  font-weight: 600;
`;

export default ConferenceDateForm;
