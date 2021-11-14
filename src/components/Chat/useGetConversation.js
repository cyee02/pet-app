import { useQuery } from '@apollo/client';
import { GET_CONVERSATIONS } from '../../graphql/queries'

const useGetConversation = () =>{
  const { data, loading, ...result } = useQuery(GET_CONVERSATIONS, {
    fetchPolicy: 'cache-and-network',
  })

  return {
    conversations: data?.getConversation,
    conversationLoading: loading,
    ...result
  }
}

export default useGetConversation