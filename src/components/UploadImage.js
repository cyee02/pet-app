import React, {useState, useCallback} from "react";
import { useDropzone } from 'react-dropzone'
// Hooks
import { useParams, useHistory } from "react-router-dom"
import useUploadImage from '../hooks/useUploadImage'

// Styles
import "../styles/containers.css"

const UploadImage = () => {
  const { imageType } = useParams()
  const history = useHistory()
  const [uploadImage] = useUploadImage()
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState();

  const onDrop = useCallback(
    async ([image]) => {
      if (image) {
        setPreview(URL.createObjectURL(image));
        setFile(image)
      } else {
        setErrors(
          'Something went wrong. Check file type and size (max. 5 MB)',
        );
      }
    },
    [],
  )

  const {
    getRootProps,
    getInputProps,
    isdragactive,
    isdragaccept,
    isdragreject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxSize: 5242880,
  });

  const imagePreview = (
    <div>
      <img src={preview} alt="" width="600"/>
    </div>
  )

  const handleUpload = async () => {
    await uploadImage({image: file, imageType})
    history.push('/profile')
  }

  const handleRemove = () => {
    setPreview()
    setFile()
  }

  return (
    <div>
      <div {...getRootProps({ isdragactive, isdragaccept, isdragreject }) } className="ProfilePicture">
        <input {...getInputProps()} type='file' />
        {file ? null : "Click to upload or drag and drop image"}
        {preview && <aside >{imagePreview}</aside>}
        {errors && <span >{errors}</span>}
      </div>
      {file ? <button onClick={handleUpload}>Submit</button> : null}
      &nbsp;
      <button onClick={handleRemove}>Remove</button>
    </div>
  )
}

export default UploadImage