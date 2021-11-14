import { useLazyQuery } from '@apollo/client';
import { GET_PROFILE } from '../graphql/queries'

const useGetProfile = () => {
  // Lazy query
  const [query, {data, loading}] = useLazyQuery(GET_PROFILE, {
    fetchPolicy: 'cache-and-network'
  })

  const getProfile = async (username) => {
    const result = await query({variables: {username: username}})
    return result
  }

  return {
    getProfile: getProfile,
    profileInfo: data?.getProfile,
    loading
  }
}

export default useGetProfile