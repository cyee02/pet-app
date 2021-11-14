import { useSubscription } from '@apollo/client';
import { GET_MESSAGE_SUB } from '../../graphql/subscriptions'

const useSubscribeMessage = (conversationId) =>{
  const {data, loading} = useSubscription(GET_MESSAGE_SUB, {
    fetchPolicy: 'cache-and-network',
    variables: {conversationId: conversationId}
  })

  return {
    messages: data?.messages,
    subLoading: loading
  }
}

export default useSubscribeMessage