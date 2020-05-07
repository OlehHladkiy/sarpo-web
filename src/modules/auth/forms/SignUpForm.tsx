import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import styled from 'styled-components';

import PasswordBar from '@components/PasswordStrengthBar';

interface SignUpFormProps {
  form: FormInstance;
  passwordToMeasure: string;
  setPasswordToMeasure: Function;
  validatePassword: (_: undefined, password: string) => void;
  onFinish: (values: Store) => void;
}

const SignUpForm: React.FunctionComponent<SignUpFormProps> = ({
  form,
  passwordToMeasure,
  setPasswordToMeasure,
  validatePassword,
  onFinish,
}: SignUpFormProps) => (
  <Form form={form} name="signUp" onFinish={onFinish}>
    <Form.Item
      name="email"
      rules={[
        { type: 'email', message: 'Please enter a valid email address' },
        { required: true, message: 'This field is required' },
      ]}
      validateTrigger="onBlur"
    >
      <Input type="email" placeholder="Enter your email..." />
    </Form.Item>
    <Form.Item
      name="name"
      rules={[{ required: true, message: 'This field is required' }]}
      validateTrigger="onBlur"
    >
      <Input placeholder="Enter your name..." />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        { required: true, message: 'This field is required' },
        {
          validator: validatePassword,
        },
      ]}
      normalize={(value: string | undefined): string => {
        setPasswordToMeasure(value);
        return value;
      }}
    >
      <Input type="password" placeholder="Enter your password..." />
    </Form.Item>
    <PasswordBar password={passwordToMeasure} />
    <SubmitButton htmlType="submit" type="primary">
      Sign Up
    </SubmitButton>
  </Form>
);

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  height: 45px;
  font-size: 1rem;
`;

export default SignUpForm;
