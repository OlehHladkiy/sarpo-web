import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { SubmitButton } from './SignUpForm';

interface SignInFormProps {
  form: FormInstance;
  onFinish: (values: Record<string, any>) => void;
}

const SignInForm: React.FunctionComponent<SignInFormProps> = ({
  form,
  onFinish,
}: SignInFormProps) => {
  const { t } = useTranslation();

  return (
    <Form form={form} name="signIn" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <Input placeholder={t('Enter your email')} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <Input type="password" placeholder={t('Enter your password')} />
      </Form.Item>
      <SubmitButton htmlType="submit" type="primary">
        {t('signin')}
      </SubmitButton>
    </Form>
  );
};

export default SignInForm;
