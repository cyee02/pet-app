import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';


const useLogin = () => {
  const [ mutate, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  });
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const login = async ({ username, password }) => {
    const result = await mutate({ variables: {username: username, password: password} })
    authStorage.setAccessToken(result.data.login.accessToken)
    await apolloClient.resetStore()
    return result;
  };

  return [login, result];
};

export default useLogin;