// import { gql } from '@apollo/client';

// export const REPOSITORY_DETAILS = gql`
//   fragment RepositoryDetails on Repository {
//     id
//     ownerAvatarUrl
//     fullName
//     description
//     language
//     stargazersCount
//     forksCount
//     reviewCount
//     ratingAverage
//   }
// `

// export const REPOSITORY_CONNECTION = gql`
//   fragment RepositoryConnection on RepositoryConnection {
//     edges {
//       node {
//         ...RepositoryDetails
//       }
//       cursor
//     }
//     pageInfo {
//       endCursor
//       startCursor
//       hasNextPage
//     }
//   }
//   ${REPOSITORY_DETAILS}
// `;

// export const REVIEW_DETAILS = gql`
//   fragment ReviewDetails on Review {
//     id
//     user {
//       id
//       username
//     }
//     rating
//     createdAt
//     text
//     repository {
//       id
//       fullName
//     }
//   }
// `;

// export const REVIEW_CONNECTION = gql`
//   fragment ReviewConnection on ReviewConnection {
//     edges {
//       node {
//         ...ReviewDetails
//       }
//       cursor
//     }
//     pageInfo {
//       endCursor
//       startCursor
//       hasNextPage
//     }
//   }
//   ${REVIEW_DETAILS}
// `;