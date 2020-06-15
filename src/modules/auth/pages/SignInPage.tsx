import { Form, message as notify } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { signIn } from '../AuthActions';
import SignInPageView from '../components/SignInPageView';

const SignInPage: React.FunctionComponent = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onFinish = async (values: Record<string, any>): Promise<void> => {
    notify.loading(`${t('Signin In')}...`);

    await dispatch(signIn(values));

    notify.destroy();
  };

  return <SignInPageView form={form} onFinish={onFinish} />;
};

export default SignInPage;
