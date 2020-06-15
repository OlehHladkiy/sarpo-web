import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const OnboardingWarning: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return <Wrapper>{t('Onboarding Warning')}</Wrapper>;
};

const Wrapper = styled.span`
  margin-top: 20px;
  max-width: 20%;
  text-align: center;
  color: #6f7287;
  font-size: 0.75rem;
`;

export default OnboardingWarning;
