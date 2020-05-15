import { Form, Radio, Input } from 'antd';
import React, { useState } from 'react';
import { EnvironmentOutlined } from '@ant-design/icons';

import FormLayout from '../components/FormLayout';
import { ConferenceType } from '../models/conference';

const LocationConferenceForm: React.FunctionComponent = () => {
  const [type, setType] = useState(ConferenceType.Venue);

  const getComponentByType = (): React.ReactNode => {
    switch (type) {
      case ConferenceType.Venue: {
        return <Input placeholder="Enter address" />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <FormLayout
      title="Location"
      description="Help people in the area discover your event and let attendees know where to show up."
      icon={<EnvironmentOutlined />}
    >
      <Form.Item name="type">
        <Radio.Group onChange={(e): void => setType(e.target.value)}>
          <Radio.Button value={ConferenceType.Venue}>Venue</Radio.Button>
          <Radio.Button value={ConferenceType.Online}>
            Online conference
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="address"
        rules={[{ required: true, message: 'Please enter address' }]}
      >
        {getComponentByType()}
      </Form.Item>
    </FormLayout>
  );
};

export default LocationConferenceForm;
