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
  mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      repositoryId
      userId
      text
      rating
      createdAt
    }
  }
`;
// export const CREATE_REVIEW = gql`
//   mutation createReview(
//     $ownerName: String!
//     $repositoryName: String!
//     $text: String
//     $rating: Int!
//   ) {
//     createReview(
//       review: {
//         ownerName: $ownerName
//         repositoryName: $repositoryName
//         text: $text
//         rating: $rating
//       }
//     ) {
//       id
//       repositoryId
//       userId
//       text
//       rating
//       createdAt
//     }
//   }
// `;
