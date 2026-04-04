import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        username
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $ownerName: String!
    $repositoryName: String!
    $text: String
    $rating: Int!
  ) {
    createReview(
      review: {
        ownerName: $ownerName
        repositoryName: $repositoryName
        text: $text
        rating: $rating
      }
    ) {
      id
      userId
      text
      rating
      createdAt
    }
  }
`;
