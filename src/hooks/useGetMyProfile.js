import { useQuery } from '@apollo/client'
import { GetMyProfile } from '../graphql/queries'

const useGetMyProfile = () => {
  const { data, loading, fetchMore, ...result } = useQuery(GetMyProfile, {
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading
    if (!canFetchMore) {
      return
    }
    fetchMore({variables:{}})
  }

  return {
    myProfile: data?.getUser,
    fetchMore: handleFetchMore,
    loading,
    ...result
  }
}

export default useGetMyProfile