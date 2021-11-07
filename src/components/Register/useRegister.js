import { useMutation } from '@apollo/client';
import { REGISTER, LOGIN } from '../../graphql/mutations';
import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useRegister = () => {
  const [ registerUser ] = useMutation(REGISTER, {
    onError: (error) => {
      console.log(error)
    }
  });
  const [ getLogin ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  });
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const register = async ({
    username,
    password,
    firstName,
    lastName,
    address,
    gender,
    phoneNumber,
    description,
    email
  }) => {
    const result = await registerUser({ variables: {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      gender: gender,
      phoneNumber: phoneNumber,
      description: description,
      email: email
    }})
    const login = await getLogin({ variables: {username: username, password: password} })
    authStorage.setAccessToken(login.data.login.accessToken)
    await apolloClient.resetStore()
    return result;
  };

  return [register];
};

export default useRegister;