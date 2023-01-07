import {
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { toast } from 'react-toastify'
import { Goals } from '../intefaces/goals'
import { v4 as uuidv4 } from 'uuid'
import ActivityService from './activity'
import { ActivityType } from '../intefaces/dashboard'
import { Timestamp } from 'firebase/firestore'
export default new (class GoalService {
  async addGoal(data: Partial<Goals>) {
    try {
      await addDoc(collection(db, 'goals'), {
        uid: data.uid,
        id: uuidv4(),
        title: data.title,
        description: data.description,
        type: data.type,
        progress: data.progress,
      })

      await ActivityService.addActivity(
        {
          id: uuidv4(),
          time: Timestamp.now(),
          type: ActivityType.AddGoal,
          title: 'Added an a new goal',
        },
        data.uid || '',
      )
      toast.success('Goal Added Successfully')
    } catch (error: any) {
      console.log(error)
      toast.error('Error Unable to Add Goal')
    }
  }

  async getAllUserGoals(userId: string): Promise<Array<Goals> | undefined> {
    try {
      const q = query(collection(db, 'goals'), where('uid', '==', userId))
      const docs = await getDocs(q)
      const goalsData = docs.docs.map((doc) => {
        const goalData = {
          uid: doc.get('uid'),
          title: doc.get('title'),
          description: doc.get('description'),
          type: doc.get('type'),
          progress: doc.get('progress'),
          id: doc.get('id'),
        }
        return goalData as Goals
      })
      return goalsData
    } catch (error: any) {
      console.log(error)
      toast.error('Error Fetching Goals')
    }
  }

  async deleteGoal(goalID: string) {
    try {
      const q = query(collection(db, 'goals'), where('id', '==', goalID))
      const document = await getDocs(q)
      const docRef = doc(db, 'goals', document.docs[0].id)
      await deleteDoc(docRef)
    } catch (error: any) {
      console.log(error)
      toast.error('Error Deleting Goal')
    }
  }

  async updateGoal(data: Partial<Goals>) {
    try {
      const q = query(collection(db, 'goals'), where('id', '==', data.id))
      const document = await getDocs(q)
      const docRef = doc(db, 'goals', document.docs[0].id)
      await updateDoc(docRef, data)
      await ActivityService.addActivity(
        {
          id: uuidv4(),
          time: Timestamp.now(),
          type: ActivityType.UpdateGoal,
          title: 'Modified a  goal',
        },
        data.uid || '',
      )
      toast.success('Successfully updated Goal')
    } catch (error: any) {
      console.log(error)
      toast.error('Error Editing Goal')
    }
  }
})()
