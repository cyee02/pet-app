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

export const UDPATE_USER = gql`
  mutation updateUser(
    $firstName: String!,
    $lastName: String!,
    $address: String!,
    $phoneNumber: String!,
    $description: String!
    ) {
    updateUser(
      firstName: $firstName,
      lastName: $lastName,
      address: $address,
      phoneNumber: $phoneNumber,
      description: $description,
    ) {
      firstName
      lastName
      address
      phoneNumber
      description
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation postMessage(
    $conversationId: String!,
    $text: String!
    ){
    postMessage(
      conversationId: $conversationId,
      text: $text
    ) {
      created
      id
      text
      user
    }
  }
`;

export const CREATE_CONVERSATION = gql`
  mutation createConversation (
    $users: [String!]
    $conversationName: String
    ){
    createConversation (
      users: $users,
      conversationName: $conversationName
    ) {
      conversationId
      conversationName
      users
    }
  }
`;