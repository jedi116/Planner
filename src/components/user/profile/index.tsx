import React from 'react'
import { auth } from '../../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import './index.css'
import workImage from '../../../assests/profile_default.jpg'
import { useMounted } from '../../../customhooks/common'
import { Button, TextField } from '@mui/material'
import { useUserProfile } from '../../../customhooks/user'
import { IProfileFormType } from '../../../intefaces/profile'
import { updateUserProfile } from '../../../service/profile'
import {userConstext} from '../userProfileContextWrapper'

export const Profile: React.FC<unknown> = () => {
  const [user, loading, error] = useAuthState(auth)
  const [profilePicture, setProfilePicture] = React.useState<any>(null)
  const mounted = useMounted()
  const userProfileContext = React.useContext(userConstext)
  const {userData, getUserProfile} = userProfileContext
  const [profileFormValues, setProfileFormValues] = React.useState<IProfileFormType>({
    name: ' ',
    occupation: ' ',
  })
  React.useEffect(() => {
    if (!user && mounted) {
      toast.warning('Needs Login to access this page')
    }
  }, [user, loading])
  React.useEffect(() => {
    setProfileFormValues({
      ...profileFormValues,
      name:  userData.name || '',
      occupation: userData.occupation || '',
    })
    setProfilePicture(userData.profilePicture)
  }, [userData])
  const onProfilePictureChange = (e: React.ChangeEvent<any>) => {
    const [file] = e.target.files
    setProfilePicture(URL.createObjectURL(file))
    setProfileFormValues({
      ...profileFormValues,
      profilePicture: file,
    })
  }
  const validateUserProfileForm = () => {
    if (
      userData.userDataLoaded &&
      userData.name === profileFormValues.name &&
      userData.occupation === profileFormValues.occupation
    ) {
      toast.warning('User profile is not updated')
      return false
    }
    return true
  }
  const onUserProfileFormSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    if (!validateUserProfileForm()) return
    updateUserProfile(profileFormValues, user).then(()=> getUserProfile())         
  }
  return (
    <div className='profile__container'>
      {user ? (
        <div className='profile__contents' onSubmit={onUserProfileFormSubmit}>
          <form className='profile__form'>
            <div className='profile__contents_profile_picture'>
              <label htmlFor='photo-upload' className='custom-file-upload fas'>
                <div className='img-wrap img-upload'>
                  <img src={profilePicture || workImage} />
                </div>
                <input id='photo-upload' type='file' onChange={onProfilePictureChange} />
              </label>
            </div>
            {userData.email && (
              <TextField
                id='standard-basic'
                label='Email'
                variant='standard'
                defaultValue={userData.email}
                disabled
              />
            )}
            {userData.name && userData.name.length > 0 && userData.userDataLoaded ? (
              <TextField
                id='standard-basic'
                label='name'
                variant='standard'
                defaultValue={userData.name}
                value={profileFormValues.name}
                onChange={(e) =>
                  setProfileFormValues({
                    ...profileFormValues,
                    name: e.target.value,
                  })
                }
              />
            ) : (
              <TextField
                id='standard-basic'
                label='name'
                variant='standard'
                value={profileFormValues.name}
                onChange={(e) =>
                  setProfileFormValues({
                    ...profileFormValues,
                    name: e.target.value,
                  })
                }
              />
            )}
            {userData.occupation && userData.occupation.length > 0 && userData.userDataLoaded ? (
              <TextField
                id='standard-basic'
                label='occupation'
                variant='standard'
                defaultValue={userData.occupation}
                value={profileFormValues.occupation}
                onChange={(e) =>
                  setProfileFormValues({
                    ...profileFormValues,
                    occupation: e.target.value,
                  })
                }
              />
            ) : (
              <TextField
                id='standard-basic'
                label='occupation'
                variant='standard'
                value={profileFormValues.occupation}
                onChange={(e) =>
                  setProfileFormValues({
                    ...profileFormValues,
                    occupation: e.target.value,
                  })
                }
              />
            )}
            <Button
              variant='contained'
              disabled={
                userData.name === profileFormValues.name &&
                userData.occupation === profileFormValues.occupation
              }
              onClick={onUserProfileFormSubmit}
              style={{ marginTop: '20px' }}
            >
              Update Profile
            </Button>
          </form>
        </div>
      ) : (
        <div>no access</div>
      )}
    </div>
  )
}
