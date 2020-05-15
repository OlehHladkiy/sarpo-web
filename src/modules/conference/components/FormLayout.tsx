import React from 'react';
import styled from 'styled-components';

interface FormLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const FormLayout: React.FunctionComponent<FormLayoutProps> = ({
  title,
  description,
  children,
  icon,
}: FormLayoutProps) => (
  <Wrapper>
    <IconWrapper>{icon}</IconWrapper>
    <Title>{title}</Title>
    <Description>{description}</Description>
    <Content>{children}</Content>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  margin-top: 25px;
  padding-left: 35px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgb(238, 237, 242);

  .ant-picker-range {
    width: 40%;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: -10px;
  top: 5.5px;
  font-size: 25px;
`;

const Title = styled.div`
  color: #1e0a3c;
  font-size: 1.875rem;
  font-weight: 700;
`;

const Description = styled.span`
  color: #39364f;
  font-size: 0.875rem;
  font-weight: 400;
`;

const Content = styled.div`
  margin-top: 15px;
`;

export default FormLayout;
