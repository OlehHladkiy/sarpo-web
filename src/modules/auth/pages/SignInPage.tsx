import { Form } from 'antd';
import React from 'react';
import styled from 'styled-components';

import SignInForm from '../forms/SignInForm';
import OnboardingWarning from '../components/OnboardingWarning';

const SignInPage: React.FunctionComponent = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, any>): void => {
    console.log(values);
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Title>Sign in</Title>
      <Tip>Use email to get started</Tip>
      <FormWrapper>
        <SignInForm form={form} onFinish={onFinish} />
      </FormWrapper>
      <OnboardingWarning />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    height: 45px;
  }
`;

const LogoWrapper = styled.div`
  margin-top: 70px;
  margin-bottom: 24px;
`;

const Logo = styled.div`
  height: 100px;
  width: 150px;
  background-image: url('/images/main-logo.png');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.div`
  padding-bottom: 40px;
  font-size: 1.5rem;
`;

const Tip = styled.div`
  color: #6f7287;
  font-size: 0.875rem;
`;

const FormWrapper = styled.div`
  margin-top: 40px;
  width: 27%;
`;

export default SignInPage;
