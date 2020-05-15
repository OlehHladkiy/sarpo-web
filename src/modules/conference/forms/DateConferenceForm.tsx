import { Radio, Form, DatePicker, TimePicker } from 'antd';
import React from 'react';
import { FieldTimeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import FormLayout from '../components/FormLayout';
import { ConferenceDateType } from '../models/conference';

const DateConferenceForm: React.FunctionComponent = () => {
  return (
    <FormLayout
      title="Date and time"
      description="Tell event-goers when your event starts and ends so they can make plans to attend"
      icon={<FieldTimeOutlined />}
    >
      <Title>Frequency</Title>
      <Form.Item name="dateType">
        <Radio.Group>
          <Radio value={ConferenceDateType.Single}>
            Single Event - Happens once and can last multiple days
          </Radio>
          <Radio value={ConferenceDateType.Multiple}>
            Recurring Events - Repeats or occurs more than once
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Title>Start and end times</Title>
      <Form.Item
        name="date"
        rules={[{ required: true, message: 'Please select the date' }]}
      >
        <DatePicker.RangePicker autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="time"
        rules={[{ required: true, message: 'Please select the time' }]}
      >
        <TimePicker.RangePicker
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

export default DateConferenceForm;
