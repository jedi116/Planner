import React from 'react'
import { IUserProfileType, useUserProfile } from '../../customhooks/user'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'

export interface IUserProfileStateContextType {
  userData: IUserProfileType
  getUserProfile: () => void
}

const defaultValue: IUserProfileStateContextType = {
  userData: {
    name: ' ',
    email: undefined,
    occupation: ' ',
    userDataLoaded: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getUserProfile: () => {},
}
export const userConstext = React.createContext<IUserProfileStateContextType>(defaultValue)

export const UserProfileContextWrapper: React.FC<unknown> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)
  const { userData, getProfile } = useUserProfile(user)
  React.useEffect(() => {
    user && getProfile()
  }, [user])
  return (
    <userConstext.Provider value={{ userData, getUserProfile: getProfile }}>
      {children}
    </userConstext.Provider>
  )
}
