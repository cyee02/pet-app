import React, {useState, useCallback} from "react";
import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import Slider from '@mui/material/Slider';
import getCroppedImg from './cropImage'
// Hooks
import { useParams, useHistory } from "react-router-dom"
import useUploadImage from '../hooks/useUploadImage'

const UploadImage = ({setTriggerFetchMore}) => {
  const { imageType } = useParams()
  const history = useHistory()
  const [uploadImage] = useUploadImage()
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState();
  const [crop, setCrop] = useState({x: 0, y:0})
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImageFile, setCroppedImageFile] = useState(null)
  const [showCropWindow, setShowCropWindow] = useState(false)

  // Set aspect ratio: profilePicture 1:1, image 4:3
  var aspectRatio = 4 /3
  if (imageType === "profilePicture") {
    aspectRatio = 1
  }

  const onDrop = useCallback(
    async ([image]) => {
      if (image) {
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
          this.setState({photoFile: image, photoUrl: fileReader.result})
        } 

        setPreview(URL.createObjectURL(image));
        setFile(image)
        setShowCropWindow(true)
      } else {
        setErrors(
          'Something went wrong. Check file type and size (max. 5 MB)',
        );
      }
    },
    [],
  )
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const saveCroppedImage = useCallback(async () => {
    try {
      const croppedFile = await getCroppedImg(
        preview,
        croppedAreaPixels,
        rotation
      )
      setShowCropWindow(false)
      setCroppedImageFile(croppedFile)
      setPreview(URL.createObjectURL(croppedFile))
    } catch (e) {
      console.error(e)
    }
  }, [preview, rotation, croppedAreaPixels])

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
    <div style={{"border": "5px"}}>
      <img src={preview} alt="" width="600" className={imageType === "profilePicture" && "profilePicture"}/>
    </div>
  )

  const handleUpload = async () => {
    await uploadImage({image: croppedImageFile, imageType})
    setTriggerFetchMore(true)
    history.push('/profile')
  }

  const handleRemove = () => {
    setPreview()
    setFile()
    setCroppedImageFile()
    setShowCropWindow(false)
  }

  return (
    <div style={{"justifySelf": "center", "marginTop": "10%"}} >
      <div {...getRootProps({ isdragactive, isdragaccept, isdragreject }) } className="previewCroppedImage">
        <input {...getInputProps()} type='file' />
        {croppedImageFile ? <aside >{imagePreview}</aside> : <p style={{"textAlign": "center"}}>Click to upload or drag and drop image here</p>}
        {errors && <span >{errors}</span>}
      </div>
      {showCropWindow &&
        <div>
          <div className="crop-container">
          <Cropper
            image={preview}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          </div>
          <div className="controls">
            Zoom
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
              style={{"padding": "22px 0px", "margin": "0px 35px"}}
            />
            Rotation
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e, rotation) => setRotation(rotation)}
              style={{"padding": "22px 0px", "margin": "0px 35px"}}
            />
            <button onClick={saveCroppedImage}>Save</button>
            <button onClick={handleRemove}>Remove</button>
          </div>
          
        </div>}
      {file && <button onClick={handleRemove}>Remove</button>}
      &nbsp;
      {file && <button onClick={handleUpload}>Submit</button>}
    </div>
  )
}

export default UploadImage