import { useQuery } from '@apollo/client'
import { GetMyProfile } from '../graphql/queries'

const useGetMyProfile = () => {
  const { data, loading, ...result } = useQuery(GetMyProfile, {
    fetchPolicy: 'cache-and-network',
  })
  return {
    myProfile: data?.getUser,
    loading,
    ...result
  }
}

export default useGetMyProfile