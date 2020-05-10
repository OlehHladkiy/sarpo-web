// @flow
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage: React.FunctionComponent = () => (
  <Wrapper>
    <Helmet title="Page Not Found" />
    <Title>UH-OH, NOTHING TO SEE HERE!</Title>
    <Section>The page you requested does not exist.</Section>
    <StyledLink to="/">Go Home</StyledLink>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1240px;
  height: calc(100vh - 72px);
  margin: 0 auto;
  padding: 15% 15px 0;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: black;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0;
`;

const Section = styled.p`
  margin-bottom: 20px;
  line-height: 1.5;
  color: black;
  font-size: 16px;
  letter-spacing: 0;
`;

const StyledLink = styled(Link)`
  color: gray;
  font-size: 16px;
  line-height: 1.5;

  &:hover {
    color: black;
  }
`;

export default NotFoundPage;
