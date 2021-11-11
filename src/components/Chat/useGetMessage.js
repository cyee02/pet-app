import { useQuery} from '@apollo/client';
import { GET_MESSAGES } from '../../graphql/queries'

const useGetMessage = (conversationId) =>{
  const {data, loading} = useQuery(GET_MESSAGES, {
    fetchPolicy: 'cache-and-network',
    variables: {conversationId: conversationId}
  })

  return {
    initialMessages: data?.getMessage,
    loading
  }
}

export default useGetMessage