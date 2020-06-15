import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Header: React.FunctionComponent = () => {
  const { i18n } = useTranslation();

  return (
    <Wrapper>
      <Button onClick={(): any => i18n.changeLanguage('ua')}>ukr</Button>
      <Button onClick={(): any => i18n.changeLanguage('en')}>en</Button>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 70px;
  width: 100%;
  background-color: #001529;
`;

export default Header;
