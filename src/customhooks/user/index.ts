import { User } from 'firebase/auth'
import React from 'react'
import { toast } from 'react-toastify'
import { getUserProfile, getProfilePicture } from '../../service/profile'

export interface IUserProfileType {
  name: string | undefined
  email: string | undefined
  occupation: string | undefined
  profilePicture?: any
  userDataLoaded: boolean
}

const defaultUserData: IUserProfileType = {
  name: ' ',
  email: undefined,
  occupation: ' ',
  userDataLoaded: false,
}

export const useUserProfile = (user: User | null | undefined) => {
  const [userData, setUserData] = React.useState<IUserProfileType>(defaultUserData)
  React.useEffect(() => {
    if (!user) {
      setUserData(defaultUserData)
    }
  }, [user])
  const getProfile = async () => {
    try {
      if (user) {
        const docs = await getUserProfile(user)
        const profilePicture = await getProfilePicture(user)

        setUserData({
          name: docs?.docs[0].get('name'),
          email: docs?.docs[0].get('email'),
          occupation: docs?.docs[0].get('occupation') || '',
          profilePicture,
          userDataLoaded: true,
        })
      }
    } catch (e: Error | any) {
      console.log(e, e.message)
      toast.error('Failed getting User Data')
    }
  }

  return { userData, getProfile }
}
