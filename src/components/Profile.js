import { useHistory } from "react-router-dom"

const Profile = (args) => {
  const history = useHistory()

  if (!args.myProfile) {
    history.push('/signin')
    return (
      null
    )
  }

  const imageList = args.myProfile.images
  ? args.myProfile.images.map(image => {
      return (<img src={image.uri} alt="" width="300" height="231" key={image.uri}/>)
    })
  : null

  // Profile
  // ? <img src={ args.myProfile.profilePicture[0].uri } alt="profilePicture" className="profilePicture"/>
  return (
    <div className="profileOverall">
      <div className="profileCard">
        <div style={{ "display": "block", "alignSelf": "center"}} >
          {args.myProfile.profilePicture
            ? <img 
              src={ args.myProfile.profilePicture[0].uri }
              alt="profilePicture" className="profilePicture"/>
            : null
          }
          <div style={{"position": "relative"}}>
            <img src={"icons/plus.svg"} alt="new dp"
              onClick={() => history.push('/uploadimage/profilePicture')}
              style={{"height": "30px", "position": "absolute", "bottom": "0px", "right": "0px" }} />
          </div>
        </div>

        <div className="profileDetails">
          <div style={{"position": "relative" }}>
            <img src={"icons/edit.svg"} alt="new dp"
              onClick={() => history.push('/updateprofile')}
              style={{"height": "30px", "position": "absolute", "top": "0px", "right": "5px" }} />
            <h1>{args.myProfile.firstName} {args.myProfile.lastName}</h1>
            <h5> {args.myProfile.description} </h5>
            <p> {args.myProfile.address} </p>
          </div>
        </div>
      </div>

      <div className="imageGallery">
        {imageList}
      </div>
    </div>
  );
}

export default Profile;