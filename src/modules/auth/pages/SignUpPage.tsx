import { Form, message as notify } from 'antd';
import { Store } from 'antd/lib/form/interface';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { testPasswordStrength } from '../utils/auth-helpers';
import { signUp } from '../AuthActions';
import SignUpPageView from '../components/SignUpPageView';

const SignUpPage: React.FunctionComponent = () => {
  const [form] = Form.useForm();
  const [passwordToMeasure, setPasswordToMeasure] = useState('');

  const dispatch = useDispatch();

  const validatePassword = (
    _: undefined,
    password: string,
  ): Promise<string | void> => {
    const { error } = testPasswordStrength(password);
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve();
  };

  const onFinish = async (values: Store): Promise<void> => {
    notify.loading('Registration in progress...');

    await dispatch(signUp(values));

    notify.success('Welcome');
  };

  return (
    <SignUpPageView
      form={form}
      onFinish={onFinish}
      passwordToMeasure={passwordToMeasure}
      setPasswordToMeasure={setPasswordToMeasure}
      validatePassword={validatePassword}
    />
  );
};

export default SignUpPage;
