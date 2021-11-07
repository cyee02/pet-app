import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useLogout = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const isLogout = async (logout) => {
    if (logout){
      authStorage.removeAccessToken()
      await apolloClient.resetStore()
      return true
    }
    return false
  }
  return isLogout;
};

export default useLogout;