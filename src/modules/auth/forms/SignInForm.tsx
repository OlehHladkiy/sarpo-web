import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';

import { SubmitButton } from './SignUpForm';

interface SignInFormProps {
  form: FormInstance;
  onFinish: (values: Record<string, any>) => void;
}

const SignInForm: React.FunctionComponent<SignInFormProps> = ({
  form,
  onFinish,
}: SignInFormProps) => (
  <Form form={form} name="signIn" onFinish={onFinish}>
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'This field is required',
        },
      ]}
    >
      <Input placeholder="Enter your email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'This field is required',
        },
      ]}
    >
      <Input type="password" placeholder="Enter your password" />
    </Form.Item>
    <SubmitButton htmlType="submit" type="primary">
      Sign In
    </SubmitButton>
  </Form>
);

export default SignInForm;
