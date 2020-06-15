import { UserOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import SignUpForm from '../forms/SignUpForm';
import OnboardingWarning from './OnboardingWarning';

interface SignUpPageViewProps {
  passwordToMeasure: string;
  form: FormInstance;
  onFinish: (values: Record<string, any>) => void;
  validatePassword: (_: undefined, password: string) => Promise<string | void>;
  setPasswordToMeasure: (passwordToMeasure: string) => void;
}

const SignUpPageView: React.FunctionComponent<SignUpPageViewProps> = ({
  passwordToMeasure,
  form,
  onFinish,
  validatePassword,
  setPasswordToMeasure,
}: SignUpPageViewProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <IconWrapper>
        <UserOutlined />
      </IconWrapper>
      <Title>{t('welcome')}</Title>
      <Description>{t('Create an account')}</Description>
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

export default SignUpPageView;
