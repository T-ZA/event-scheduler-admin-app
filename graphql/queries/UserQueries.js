import gql from 'graphql-tag'

/* Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      email
      isAdminUser
    }
  }
`

/* Mutations */
export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signInUser(email: $email, password: $password, adminApplication: true) {
      token
      _id
      email
    }
  }
`
