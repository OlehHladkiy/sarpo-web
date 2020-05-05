import gql from 'graphql-tag';

export const namespace = 'USER';
export const FETCH_ME = `${namespace}/FETCH_ME`;
export const UPDATE_USER = `${namespace}/UPDATE_USER`;
export const UPDATE_USER_PASSWORD = `${namespace}/UPDATE_USER_PASSWORD`;

export const USER_FRAGMENT = gql`
  fragment user on User {
    _id
    email
    name
    avatar
    phone
    address {
      line1
      line2
      city
      country
    }
    tickets
    createdAt
    updatedAt
  }
`;

const FETCH_ME_QUERY = gql`
  query {
    fetchMe {
      ...user
    }
  }
  ${USER_FRAGMENT}
`;

export const fetchMe: any = () => ({
  type: FETCH_ME,
  payload: {
    key: 'fetchMe',
    graphql: {
      fetchPolicy: 'no-cache',
      query: FETCH_ME_QUERY,
    },
  },
});

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($payload: UpdateUserInput!) {
    updateUser(data: $payload) {
      ...user
    }
  }
  ${USER_FRAGMENT}
`;

export const updateUser: any = payload => ({
  type: UPDATE_USER,
  payload: {
    key: 'updateUser',
    graphql: {
      mutation: UPDATE_USER_MUTATION,
      variables: {
        payload,
      },
    },
  },
});

const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation updateUserPassword($payload: UpdateUserPasswordInput!) {
    updateUserPassword(data: $payload) {
      user {
        ...user
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const updateUserPassword: any = payload => ({
  type: UPDATE_USER_PASSWORD,
  payload: {
    key: 'updateUserPassword',
    graphql: {
      mutation: UPDATE_USER_PASSWORD_MUTATION,
      variables: {
        payload,
      },
    },
  },
});
