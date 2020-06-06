import { Form, Input, Radio, InputNumber, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import styled from 'styled-components';

import { TicketType } from '../models/conference';

interface CreateOrEditTicketFormProps {
  loading: boolean;
  form: FormInstance;
  onFinish: (data: any) => void;
}

const CreateOrEditTicketForm: React.FunctionComponent<CreateOrEditTicketFormProps> = ({
  loading,
  form,
  onFinish,
}: CreateOrEditTicketFormProps) => (
  <Form
    layout="vertical"
    form={form}
    onFinish={onFinish}
    initialValues={{
      type: TicketType.Free,
      minQuantity: 1,
      maxQuantity: 10,
    }}
  >
    <Form.Item label="Ticket type" name="type">
      <Radio.Group>
        <Radio.Button value={TicketType.Free}>Free</Radio.Button>
        <Radio.Button value={TicketType.Paid}>Paid</Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item
      label="Title"
      name="title"
      rules={[
        {
          required: true,
          message: 'Please enter tickets title',
        },
      ]}
    >
      <Input placeholder="Enter tickets title..." />
    </Form.Item>
    <Form.Item
      name="quantity"
      label="Quantity"
      rules={[
        {
          required: true,
          message: 'Please enter tickets quantity',
        },
      ]}
    >
      <NumberedInput
        min={1}
        placeholder="Enter tickets quantity..."
        type="number"
      />
    </Form.Item>
    <PairedInputsWrapper>
      <Form.Item
        label="Min tickets quantity"
        name="minQuantity"
        rules={[
          {
            required: true,
            message: 'Please enter minimal quantity',
          },
        ]}
      >
        <NumberedInput min={1} />
      </Form.Item>
      <Form.Item
        label="Max tickets quantity"
        name="maxQuantity"
        rules={[
          {
            required: true,
            message: 'Please enter maximal quantity',
          },
        ]}
      >
        <NumberedInput min={1} />
      </Form.Item>
    </PairedInputsWrapper>
    <Button loading={loading} htmlType="submit" type="primary">
      Create
    </Button>
  </Form>
);

const NumberedInput = styled(InputNumber)`
  width: 100%;
`;

const PairedInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default CreateOrEditTicketForm;
