import { useMutation } from '@apollo/client';
import { UDPATE_USER } from '../graphql/mutations';

const useUpdateProfile = () => {
  const [ updateUser ] = useMutation(UDPATE_USER, {
    onError: (error) => {
      console.log(error)
    }
  });
  const updateProfile = async ({
    firstName,
    lastName,
    address,
    description,
    phoneNumber
  }) => {
    const result = await updateUser({ variables: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      description: description,
      phoneNumber: phoneNumber
    }})
    return result;
  };

  return [updateProfile];
};

export default useUpdateProfile;