import gql from 'graphql-tag';

import { USER_FRAGMENT } from '@modules/user/UserActions';

const namespace = 'AUTH';

export const SIGN_IN = `${namespace}/SIGN_IN`;
export const SIGN_UP = `${namespace}/SIGN_UP`;
export const SIGN_OUT = `${namespace}/SIGN_OUT`;

const SIGN_IN_MUTATION = gql`
  mutation signIn($payload: SignInInput!) {
    signIn(data: $payload) {
      token
      user {
        ...user
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const signIn: any = payload => ({
  type: SIGN_IN,
  payload: {
    key: 'signIn',
    graphql: {
      mutation: SIGN_IN_MUTATION,
      variables: { payload },
    },
  },
});

const SIGNUP_MUTATION = gql`
  mutation signUp($payload: SignUpInput!) {
    signUp(data: $payload) {
      token
      user {
        ...user
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const signUp: any = payload => ({
  type: SIGN_UP,
  payload: {
    key: 'signUp',
    graphql: {
      mutation: SIGNUP_MUTATION,
      variables: { payload },
    },
  },
});

export const signOut: any = () => ({
  type: SIGN_OUT,
});
