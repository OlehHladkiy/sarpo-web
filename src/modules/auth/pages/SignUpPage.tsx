import { Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styled from 'styled-components';

import SignUpForm from '../forms/SignUpForm';
import { testPasswordStrength } from '../utils/auth-helpers';
import OnboardingWarning from '../components/OnboardingWarning';

const SignUpPage: React.FunctionComponent = () => {
  const [form] = Form.useForm();
  const [passwordToMeasure, setPasswordToMeasure] = useState('');

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

  const onFinish = (values: Store): void => {
    console.log(values);
  };

  return (
    <Wrapper>
      <IconWrapper>
        <UserOutlined />
      </IconWrapper>
      <Title>Welcome</Title>
      <Description>Create an account</Description>
      <FormWrapper>
        <SignUpForm
          form={form}
          passwordToMeasure={passwordToMeasure}
          setPasswordToMeasure={setPasswordToMeasure}
          validatePassword={validatePassword}
          onFinish={onFinish}
        />
      </FormWrapper>
      <OnboardingWarning />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  input {
    height: 45px;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 40px;
`;

const Description = styled.div`
  margin-bottom: 32px;
  color: #6f7287;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #1890ff !important;
`;

const FormWrapper = styled.div`
  width: 27%;
`;

export default SignUpPage;
