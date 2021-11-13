import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../graphql/queries'

const useGetProfile = (username) => {
  const {data, loading} = useQuery(GET_PROFILE, {
    fetchPolicy: 'cache-and-network',
    variables: {username: username}
  })

  return {
    profileInfo: data?.getProfile,
    loading
  }
}

export default useGetProfile