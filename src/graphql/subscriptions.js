import { gql } from '@apollo/client';

export const GET_MESSAGE_SUB = gql`
  subscription ($conversationId: String!) {
    messages (
      conversationId: $conversationId
    ){
      created
      id
      text
      user
    }
  }
`;