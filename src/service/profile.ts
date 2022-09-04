import { User } from 'firebase/auth'
import { IProfileFormType } from '../intefaces/profile'
import { query, getDocs, collection, where, setDoc, doc, updateDoc } from 'firebase/firestore'
import { db, fireBaseStorage, imageStoragePath } from '../firebase/firebase'
import { toast } from 'react-toastify'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const updateUserProfile = async (
  updateValue: IProfileFormType,
  user: User | null | undefined,
) => {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
    const userDoc = await getDocs(q)
    const docRef = doc(db, 'users', userDoc.docs[0].id)
    await updateDoc(docRef, {
      name: updateValue.name,
      occupation: updateValue.occupation,
    })
    if (updateValue.profilePicture && user) {
      const PPRef = ref(fireBaseStorage, `${imageStoragePath}${user.uid}`)
      await uploadBytes(PPRef, updateValue.profilePicture)
    }
    toast.success('Updated Profile successfully')
  } catch (err: any) {
    console.log(err, err.message)
    toast.error('Failed to update Profile')
  }
}

export const getUserProfile = async (user: User) => {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const userDoc = await getDocs(q)
    return userDoc
  } catch (err: any) {
    console.log(err, err.message)
    toast.error('Failed to get user Profile')
    return null
  }
}

export const getProfilePicture = async (user: User) => {
  try {
    const profilePictureRef = ref(fireBaseStorage, `${imageStoragePath}${user?.uid}`)
    const profilePicture = await getDownloadURL(profilePictureRef)
    return profilePicture
  } catch (err: any) {
    console.log(`Error when fetching profile picture, \n ${err}`, err.message)
    return ''
  }
}
