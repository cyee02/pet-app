import { useLazyQuery } from '@apollo/client';
import { GET_MESSAGES } from '../../graphql/queries'

const useGetMessage = () =>{
  const [query, {data, loading}] = useLazyQuery(GET_MESSAGES, {
    fetchPolicy: 'cache-and-network'
  })

  const getMessage = (conversationId) => {
    return query({variables: {conversationId: conversationId}})
  }

  return {
    getMessage: getMessage,
    initialMessages: data?.getMessage,
    loading
  }
}

export default useGetMessage