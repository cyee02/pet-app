import { gql } from '@apollo/client';
// import { REPOSITORY_CONNECTION, REPOSITORY_DETAILS, REVIEW_CONNECTION, REVIEW_DETAILS } from './fragments';

export const GET_MY_PROFILE = gql`
  query getUser {
    getUser {
      username,
      firstName,
      lastName,
      address,
      gender,
      phoneNumber,
      description,
      email,
      profilePicture {
        uri,
        imageType,
        created
      }
      images {
        uri,
        imageType,
        created
      }
    }
  }
`;

export const GET_CONVERSATIONS = gql`
  query getConversation {
    getConversation {
      conversationId,
      conversationName,
      users
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessage ($conversationId: String!) {
    getMessage (
      conversationId: $conversationId
    ){
      created,
      id,
      text,
      user
    }
  }
`;

// export const GET_REPOSITORIES = gql`
//   query repositories (
//     $orderDirection: OrderDirection,
//     $orderBy: AllRepositoriesOrderBy
//     $searchKeyword: String
//     $first: Int
//     $after: String
//     ){
//     repositories (
//       orderDirection: $orderDirection,
//       orderBy: $orderBy,
//       searchKeyword: $searchKeyword,
//       first: $first,
//       after: $after
//     ){
//       ...RepositoryConnection
//     }
//   }
//   ${REPOSITORY_CONNECTION}
// `;

// export const GET_AUTHORIZED_USER = gql`
//   query authorizedUser ($includeReviews: Boolean=false) {
//     authorizedUser {
//       id
//       username
//       reviews @include(if: $includeReviews) {
//         edges {
//           node {
//             ...ReviewDetails
//           }
//         }
//         pageInfo {
//           endCursor
//           startCursor
//           hasNextPage
//         }
//       }
//     }
//   }
//   ${REVIEW_DETAILS}
// `;

// export const GET_REPOSITORY = gql`
//   query repository ($id: ID!, $first: Int, $after: String) {
//     repository (id: $id) {
//       url
//       ...RepositoryDetails
//       reviews (first: $first, after: $after) {
//         ...ReviewConnection
//       }
//     }
//   }
//   ${REPOSITORY_DETAILS}
//   ${REVIEW_CONNECTION}
// `;
