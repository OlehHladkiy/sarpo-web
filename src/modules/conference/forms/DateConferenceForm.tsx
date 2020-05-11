import { Radio, Form } from 'antd';
import React from 'react';
import { FieldTimeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import FormLayout from '../components/FormLayout';
import { ConferenceDateType } from '../models/conference';

const DateConferenceForm: React.FunctionComponent = () => (
  <FormLayout
    title="Date and time"
    description="Tell event-goers when your event starts and ends so they can make plans to attend"
    icon={<FieldTimeOutlined />}
  >
    <FrequencyTitle>Frequency</FrequencyTitle>
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
  </FormLayout>
);

const FrequencyTitle = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
  font-size: 0.875rem;
  font-weight: 600;
`;

export default DateConferenceForm;
