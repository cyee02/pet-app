import { useMutation } from '@apollo/client';
import { UPLOAD } from '../graphql/mutations';

const useUploadImage = () => {
  const [ mutate, result ] = useMutation(UPLOAD, {
    onError: (error) => {
      console.log(error)
    }
  });
  const uploadImage = async ({ image, imageType }) => {
    const result = await mutate({ variables: {image: image, imageType: imageType} })
    return result;
  };

  return [uploadImage, result];
};

export default useUploadImage;