import { useMutation } from '@apollo/client';
import { POST_MESSAGE } from '../../graphql/mutations';

const usePostMessage = () => {
  const [ request ] = useMutation(POST_MESSAGE, {
    onError: (error) => {
      console.log(error)
    }
  });
  const postMessage = async ({
    conversationId,
    text
  }) => {
    const result = await request({ variables: {
      conversationId: conversationId,
      text: text
    }})
    return result;
  };

  return [postMessage];
};

export default usePostMessage;