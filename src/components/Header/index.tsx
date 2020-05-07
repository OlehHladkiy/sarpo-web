import * as R from 'ramda';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';

enum SignRoute {
  SignIn = 'signin',
  SignUp = 'signup',
}

const ToSignRouteMap = {
  [SignRoute.SignUp]: SignRoute.SignIn,
  [SignRoute.SignIn]: SignRoute.SignUp,
};

const SignButtonTitle = {
  [SignRoute.SignIn]: 'Sign Up',
  [SignRoute.SignUp]: 'Sign In',
};

const Header: React.FunctionComponent = () => {
  const history = useHistory();
  const location = useLocation();

  const path = R.compose(R.last, R.split('/'))(location.pathname);

  return (
    <Wrapper>
      <Logo />
      <ControlsWrapper>
        <SignInButton onClick={(): void => history.push(ToSignRouteMap[path])}>
          {SignButtonTitle[path]}
        </SignInButton>
      </ControlsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  padding: 0 40px;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  height: 72px;
  width: 100vw;
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  height: 100%;
  width: 100px;
  background-image: url('/images/logo.png');
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
`;

const ControlsWrapper = styled.div`
  margin-left: auto;
`;

const SignInButton = styled.div`
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6f7287;
  cursor: pointer;

  &:hover {
    color: #000;
    background-color: #f8f7fa;
  }
`;

export default Header;
