import { useLazyQuery } from '@apollo/client';
import { GET_CHAT_PROFILE } from '../graphql/queries'

const useGetProfile = () => {
  // Lazy query
  const [query, {data, loading}] = useLazyQuery(GET_CHAT_PROFILE, {
    fetchPolicy: 'cache-and-network'
  })

  const getProfiles = async (usernames) => {
    const result = await query({variables: {usernames: usernames}})
    return result
  }

  return {
    getProfiles: getProfiles,
    profileListInfo: data?.getProfiles,
    profileListLoading: loading
  }
}

export default useGetProfile