import { useMutation } from '@apollo/client';
import { CREATE_CONVERSATION } from '../../graphql/mutations';

const useCreateConversation = () => {
  const [ mutation ] = useMutation(CREATE_CONVERSATION, {
    onError: (error) => {
      console.log(error)
    }
  });
  const createConversation = async ({
    users,
    conversationName
  }) => {
    const result = await mutation({ variables: {
      users: users,
      conversationName: conversationName
    }})
    return result;
  };

  return [createConversation];
};

export default useCreateConversation;