import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signInUser(email: $email, password: $password, adminApplication: true) {
      token
    }
  }
`
