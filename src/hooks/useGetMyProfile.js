import { useQuery } from '@apollo/client'
import { GET_MY_PROFILE } from '../graphql/queries'

const useGetMyProfile = () => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = (triggerFetchMore) => {
    const canFetchMore = !loading && triggerFetchMore
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