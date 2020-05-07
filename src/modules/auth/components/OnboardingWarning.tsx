import React from 'react';
import styled from 'styled-components';

const OnboardingWarning: React.FunctionComponent = () => (
  <Wrapper>
    By clicking {'"'}Sign In{'"'} or {'"'}Sign Up{'"'}, I accept the Sarpo Terms
    Of Service, Community Guidelines and have read the Privacy Policy.
  </Wrapper>
);

const Wrapper = styled.span`
  margin-top: 20px;
  max-width: 20%;
  text-align: center;
  color: #6f7287;
  font-size: 0.75rem;
`;

export default OnboardingWarning;
