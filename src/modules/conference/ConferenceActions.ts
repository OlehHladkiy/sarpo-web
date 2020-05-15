import gql from 'graphql-tag';

export const namespace = 'CONFERENCE';
export const FETCH_CONFERENCES = `${namespace}/FETCH_CONFERENCES`;
export const FETCH_CONFERENCE = `${namespace}/FETCH_CONFERENCE`;
export const CREATE_CONFERENCE = `${namespace}/CREATE_CONFERENCE`;

export const CONFERENCE_FRAGMENT = gql`
  fragment conference on Conference {
    _id
    image
    description
    summary
    title
    organizer
    address
    type
    dateType
    startDate
    endDate
    startTime
    endTime
    author
    status
    onboardedSteps
    createdAt
    updatedAt
  }
`;

const FETCH_CONFERENCES_QUERY = gql`
  query getConferences($payload: GetConferencesInput!) {
    getConferences(data: $payload) {
      ...conference
    }
  }
  ${CONFERENCE_FRAGMENT}
`;

export const fetchConferences: any = (payload = {}) => ({
  type: FETCH_CONFERENCES,
  payload: {
    key: 'getConferences',
    graphql: {
      fetchPolicy: 'no-cache',
      query: FETCH_CONFERENCES_QUERY,
      variables: {
        payload,
      },
    },
  },
});

const FETCH_CONFERENCE_QUERY = gql`
  query getConference($payload: GetConferenceInput!) {
    getConference(data: $payload) {
      ...conference
    }
  }
  ${CONFERENCE_FRAGMENT}
`;

export const fetchConference: any = (payload = {}) => ({
  type: FETCH_CONFERENCE,
  payload: {
    key: 'getConference',
    graphql: {
      fetchPolicy: 'no-cache',
      query: FETCH_CONFERENCE_QUERY,
      variables: {
        payload,
      },
    },
  },
});

const CREATE_CONFERENCE_MUTATION = gql`
  mutation createConference($payload: CreateConferenceInput!) {
    createConference(data: $payload) {
      ...conference
    }
  }
  ${CONFERENCE_FRAGMENT}
`;

export const createConference: any = payload => ({
  type: CREATE_CONFERENCE,
  payload: {
    key: 'createConference',
    graphql: {
      mutation: CREATE_CONFERENCE_MUTATION,
      variables: {
        payload,
      },
    },
  },
});
