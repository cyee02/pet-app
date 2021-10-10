import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      username,
      accessToken,
      expiresAt
    }
  }
`;

export const REGISTER = gql`
  mutation signup (
    $username: String!,
    $password: String!,
    $firstName: String!,
    $lastName: String!,
    $address: String!,
    $gender: String!,
    $phoneNumber: String!,
    $description: String!,
    $email: String!
  ) {
    signup(
      username: $username,
      password: $password,
      firstName: $firstName,
      lastName: $lastName,
      address: $address,
      gender: $gender,
      phoneNumber: $phoneNumber,
      description: $description,
      email: $email
    ) {
      username
      firstName
      lastName
      address
      gender
      phoneNumber
      description
      email
    }
  }
`;

export const UPLOAD = gql`
  mutation uploadImage($image: Upload!, $imageType: String!) {
    uploadImage(
      image: $image,
      imageType: $imageType
    ) {
      imageType
      uri
      created
    }
  }
`;

// export const ADD_REVIEW = gql`
//   mutation createReview(
//     $repositoryName: String!,
//     $ownerName: String!,
//     $rating: Int!,
//     $text: String
//     ) {
//     createReview(
//       review: {
//         repositoryName: $repositoryName,
//         ownerName: $ownerName,
//         rating: $rating,
//         text: $text
//       }
//     ) {
//       id
//     }
//   }
// `;

// export const CREATE_USER = gql`
//   mutation createUser(
//     $username: String!,
//     $password: String!,
//     ) {
//     createUser(
//       user: {
//         username: $username,
//         password: $password
//       }
//     ) {
//       username
//       createdAt
//     }
//   }
// `;

// export const DELETE_REVIEW = gql`
//   mutation deleteReview ($id: ID!){
//     deleteReview (id: $id)
//   }
// `;